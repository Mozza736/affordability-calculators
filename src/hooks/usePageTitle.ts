import { useEffect } from 'react';

const DEFAULT_TITLE = 'Affordability Calculators – Find Out What You Can Really Afford';
const DEFAULT_DESC = 'Free UK affordability calculators. Instantly find out how much house, rent, or car you can afford based on your salary and expenses.';

function setMetaDescription(content: string) {
  let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!tag) {
    tag = document.createElement('meta');
    tag.name = 'description';
    document.head.appendChild(tag);
  }
  tag.content = content;
}

export function usePageTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) setMetaDescription(description);
    return () => {
      document.title = DEFAULT_TITLE;
      setMetaDescription(DEFAULT_DESC);
    };
  }, [title, description]);
}
