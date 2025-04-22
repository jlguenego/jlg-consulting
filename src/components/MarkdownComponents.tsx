export default {
  a: (props: any) => (
    <a className="text-primary-700 underline hover:text-primary-900" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="my-4 text-black italic dark:text-white" {...props} />
  ),
  h1: (props: any) => (
    <h1
      className="font-heading mb-8 text-center text-3xl font-bold text-primary-700"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="font-heading my-4 text-2xl font-semibold text-primary-700"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="font-heading my-4 text-xl font-medium text-primary-700"
      {...props}
    />
  ),
  hr: (props: any) => <hr className="my-4 border-b" {...props} />,
  ul: (props: any) => <ul className="mb-4" {...props} />,
  li: (props: any) => <li className="my-2 ml-8 list-disc" {...props} />,

  // 🟢 Composants personnalisés pour les tableaux
  table: (props: any) => (
    <div className="my-8 overflow-x-auto">
      <table
        className="w-full border border-gray-300 text-left text-sm text-gray-700"
        {...props}
      />
    </div>
  ),
  thead: (props: any) => (
    <thead className="bg-primary-700 font-semibold text-white" {...props} />
  ),
  tbody: (props: any) => <tbody {...props} />,
  tr: (props: any) => (
    <tr className="border-t border-gray-300 even:bg-gray-100" {...props} />
  ),
  th: (props: any) => (
    <th className="border border-gray-300 px-4 py-2" {...props} />
  ),
  td: (props: any) => (
    <td className="border border-gray-300 px-4 py-2 align-top" {...props} />
  ),
};
