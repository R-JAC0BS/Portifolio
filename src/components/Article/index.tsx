import React from 'react';


interface ArticleCardInformation extends React.HTMLAttributes<HTMLElement> {
    icon  ?: React.ReactNode;
    placeHolder ?: string;
    rede : string;
    href : string;
}

const ArticleCard = ({rede, href ,icon,placeHolder, ...rest} : ArticleCardInformation) => {
  return (
     <article className="flex flex-col items-center p-4 rounded-2xl gap-2 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300" style={{ backgroundColor: 'var(--container-color)' }} {...rest}>
               <div style={{ color: 'var(--title-color)' }}>
                 {icon}
               </div>
                <h4 className="font-bold" style={{ color: 'var(--title-color)' }}>{rede}</h4>
                <h5 className="text-sm" style={{ color: 'var(--text-color)' }}>{placeHolder}</h5>
                <a
                  href={href}
                  target="_blank"
                  className="text-xs underline hover:opacity-80 transition-opacity duration-300"
                  style={{ color: 'var(--title-color)' }}
                >
                  Entre em contato
                </a>
              </article>
  );
};

export default ArticleCard;