export type AffiliateLink = {
  name: string;
  url: string;
}

export type AffiliateSite = {
  urls: string[];
  transaction_complete_url: string;
  affiliates: AffiliateLink[]
}
