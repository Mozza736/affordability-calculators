import { useEffect } from 'react';

export function useStructuredData(schemas: object | object[]) {
  useEffect(() => {
    const list = Array.isArray(schemas) ? schemas : [schemas];
    const tags: HTMLScriptElement[] = list.map((schema) => {
      const tag = document.createElement('script');
      tag.type = 'application/ld+json';
      tag.setAttribute('data-structured', 'true');
      tag.textContent = JSON.stringify(schema);
      document.head.appendChild(tag);
      return tag;
    });
    return () => {
      tags.forEach((t) => t.remove());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
