"use client";

import useAuthRedirect from "@/hooks/useAuthRedirect";

function HomePage() {
  useAuthRedirect();

  return (
    <>
      <h1>Welcome to home page</h1>
    </>
  );
}

export default HomePage;

{
  /* <h1>Good Morning </h1>
<Button
  variant="white"
  onClick={toggleLocale}
  className="flex items-center gap-2"
>
  {locale === "ar" ? "EN" : "ع"}
</Button> */
}
