console.log("markdown components");

export const h1 = (props: any) => (
  <h1 className="text-3xl font-bold" {...props} />
);
export const h2 = (props: any) => (
  <h2 className="text-2xl font-bold" {...props} />
);
export const h3 = (props: any) => (
  <h3 className="text-xl font-bold" {...props} />
);
// etc.
