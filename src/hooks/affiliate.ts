import { useEffect, useState } from "react";
import { matchesUrl } from "@/utils";
import affiliateLinks from '../../public/affiliateLinks.json'

type AffiliateEntry = {
  name: string;
  url: string;
}

export const useAffiliateSelector = (currentUrl: string) => {
  const [affiliateOptions, setAffiliateOptions] = useState([] as AffiliateEntry[]);

  useEffect(() => {
    const matchingRule = affiliateLinks.find(entry => entry.urls.some(url => matchesUrl(currentUrl, url)));

    setAffiliateOptions(matchingRule?.affiliates || []);
  }, [currentUrl]);

  return {
    affiliateOptions
  }
}