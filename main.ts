import {
  Application,
  Context,
  Router,
} from "https://deno.land/x/oak@v12.6.0/mod.ts";
import "https://deno.land/x/xhr@0.1.1/mod.ts";
import { installGlobals } from "https://deno.land/x/virtualstorage@0.1.0/mod.ts";

import { initializeApp } from "npm:firebase/app";
import { getStorage, ref, uploadBytes } from "npm:firebase/storage";

import { nanoid } from "npm:nanoid";

import { samplePdf } from "./pdfUtils.ts";
const firebaseConfig = {
  apiKey: "AIzaSyC_nPSxJ62OvxxkawYfKu5boQwKO9wjmZk",
  authDomain: "pdf-test-ad4cf.firebaseapp.com",
  projectId: "pdf-test-ad4cf",
  storageBucket: "pdf-test-ad4cf.appspot.com",
  messagingSenderId: "209199046132",
  appId: "1:209199046132:web:1081c11d6f3e782834ada1",
};

const firebaseApp = initializeApp(firebaseConfig, "deno-pdf");
const storage = getStorage(firebaseApp);

installGlobals();
const app = new Application();

const router = new Router();
router.get("/", (ctx) => {
  ctx.response.body = "hello";
});
router.post("/pdf", async (ctx: Context) => {
  const body = ctx.request.body();
  const test: string = await body.value;
  const bytes = await samplePdf(test);

  const storageRef = ref(storage, `${nanoid(5)}.pdf`);
  uploadBytes(storageRef, bytes).then(() => {
    console.log("Uploaded a blob or file!");
  });
  ctx.response.type = "text";
  ctx.response.body = "ok";
});

app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port: 80 });
