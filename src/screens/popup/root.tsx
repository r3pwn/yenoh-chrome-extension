import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Typography } from '@/components/ui/typography';
import { AffiliateSite } from '@/types/data';
import { X } from 'lucide-react';
import { useState } from 'react';

export default function PopupRoot({ site }: { site: AffiliateSite }) {
  const [selectedUrl, setSelectedUrl] = useState('');

  function closePopup() {
    window.parent.postMessage({
      type: 'close-yenoh',
    }, '*');
  }

  function activateCreatorKickback() {
    if (!selectedUrl) {
      return;
    }

    window.parent.postMessage({
      type: 'open-url-yenoh',
      url: selectedUrl
    }, '*');

    closePopup();
  }

  return (
    <>
      <img src={chrome.runtime.getURL("/icons/48.png")} height={24} width={24} alt="Yenoh logo" className='mr-auto' />
      <Button variant="ghost" size="icon" className='fixed top-4 right-4' onClick={closePopup}>
        <X className='w-[24px] h-[24px]' />
      </Button>
      <Typography display="heading-sm" as="h1" className='mr-auto'>
        Affiliate program found!
      </Typography>
      <div className='flex flex-row gap-2'>
        <Select value={selectedUrl} onValueChange={setSelectedUrl}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Affiliate" />
          </SelectTrigger>
          <SelectContent>
            {site.affiliates.map((option, index) => {
              return <SelectItem key={index} value={option.url}>{option.name}</SelectItem>
            })}
          </SelectContent>
        </Select>
        <Button disabled={!selectedUrl} onClick={activateCreatorKickback}>
          Activate
        </Button>
      </div>
    </>
  )
}
