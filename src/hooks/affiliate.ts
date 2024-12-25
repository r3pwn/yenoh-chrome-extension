import { useEffect, useState } from "react";
import affiliateLinks from '../../public/affiliateLinks.json'
import { matchesUrl } from "@/utils";

type AffiliateEntry = {
  name: string;
  url: string;
}

export const useAffiliateSelector = () => {
  const [affiliateOptions, setAffiliateOptions] = useState([] as AffiliateEntry[]);

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const currentUrl = params.get('currentUrl') || '';

    const matchingRule = affiliateLinks.find(entry => entry.urls.some(url => matchesUrl(currentUrl, url)));

    setAffiliateOptions(matchingRule?.affiliates || []);
  }, []);

  return {
    affiliateOptions
  }
}