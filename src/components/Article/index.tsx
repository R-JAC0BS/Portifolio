import React from 'react';


interface ArticleCardInformation extends React.HTMLAttributes<HTMLElement> {
    icon  ?: React.ReactNode;
    placeHolder ?: string;
    rede : string;
    href : string;
}

const ArticleCard = ({rede, href ,icon,placeHolder, ...rest} : ArticleCardInformation) => {
  return (
     <article className="flex flex-col items-center bg-white  p-4 rounded-2xl gap-2 shadow-md border border-gray-200 hover:shadow-lg" {...rest}>
               <div className="text-black">
                 {icon}
               </div>
                <h4 className="font-bold text-black">{rede}</h4>
                <h5 className="text-sm text-black">{placeHolder}</h5>
                <a
                  href={href}
                  target="_blank"
                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  Entre em contato
                </a>
              </article>
  );
};

export default ArticleCard;