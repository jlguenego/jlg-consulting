export default {
  h1: (props: any) => (
    <h1
      className="font-heading my-8 text-center text-3xl font-bold text-green-700"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="font-heading mb-4 text-2xl font-semibold text-green-700"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="font-heading mb-4 text-xl font-medium text-green-700"
      {...props}
    />
  ),
  hr: (props: any) => <hr className="my-4 border-b" {...props} />,
  ul: (props: any) => <ul className="mb-4" {...props} />,
  li: (props: any) => <li className="my-2 ml-8 list-disc" {...props} />,
  // Ajoute d'autres composants si besoin (p, a, ul, li, etc.)
};
