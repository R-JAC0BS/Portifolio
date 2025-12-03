import React from 'react';


interface ArticleCardInformation extends React.HTMLAttributes<HTMLElement> {
    icon  ?: React.ReactNode;
    placeHolder ?: string;
    rede : string;
    href : string;
}

const ArticleCard = ({rede, href ,icon,placeHolder, ...rest} : ArticleCardInformation) => {
  return (
     <article className="flex flex-col items-center bg-white dark:bg-slate-700 p-4 rounded-2xl gap-2 shadow-md border border-gray-200 dark:border-slate-600 transition-colors duration-300 hover:shadow-lg" {...rest}>
               <div className="text-gray-700 dark:text-gray-300">
                 {icon}
               </div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200">{rede}</h4>
                <h5 className="text-sm text-gray-600 dark:text-gray-400">{placeHolder}</h5>
                <a
                  href={href}
                  target="_blank"
                  className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300 underline"
                >
                  Entre em contato
                </a>
              </article>
  );
};

export default ArticleCard;