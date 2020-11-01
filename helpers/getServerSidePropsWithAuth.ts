import { firebaseAdmin } from "config/firebase-admin";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import HttpStatus from "http-status-codes";

export const getServerSidePropsWithAuth = (ogGetServerSideProps?: GetServerSideProps): GetServerSideProps => async (ctx) => {
  try {
    const cookie = nookies.get(ctx);
    await firebaseAdmin.auth().verifyIdToken(cookie["token"]);

    if (ogGetServerSideProps) {
      return await ogGetServerSideProps(ctx);
    }
  } catch (err) {
    // auth failed... redirect user to login page
    ctx.res.writeHead(HttpStatus.TEMPORARY_REDIRECT, { Location: `/admin/login?redirect=${ctx.resolvedUrl}` });
    ctx.res.end();
  }

  return {
    props: {},
  };
};
