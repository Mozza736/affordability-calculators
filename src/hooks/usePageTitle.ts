import { useEffect } from 'react';

const DEFAULT_TITLE = 'Affordability Calculators – Find Out What You Can Really Afford';
const DEFAULT_DESC = 'Free UK affordability calculators. Instantly find out how much house, rent, or car you can afford based on your salary and expenses.';
const BASE_URL = 'https://affordabilitycalculators.co.uk';

function setMetaDescription(content: string) {
  let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!tag) {
    tag = document.createElement('meta');
    tag.name = 'description';
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function removeCanonical() {
  const tag = document.querySelector<HTMLLinkElement>('link[rel="canonical"][data-dynamic]');
  if (tag) tag.remove();
}

export function usePageTitle(title: string, description?: string, canonicalPath?: string) {
  useEffect(() => {
    document.title = title;
    if (description) setMetaDescription(description);

    if (canonicalPath) {
      let tag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      const href = canonicalPath.startsWith('http') ? canonicalPath : `${BASE_URL}${canonicalPath}`;
      if (!tag) {
        tag = document.createElement('link');
        tag.rel = 'canonical';
        tag.setAttribute('data-dynamic', 'true');
        document.head.appendChild(tag);
      }
      tag.href = href;
    }

    return () => {
      document.title = DEFAULT_TITLE;
      setMetaDescription(DEFAULT_DESC);
      removeCanonical();
    };
  }, [title, description, canonicalPath]);
}
