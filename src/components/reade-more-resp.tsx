interface ReadeMoreRespProps {
  text: string;
}

export function ReadeMoreResp({ text }: ReadeMoreRespProps) {
  return (
    <div className='flex flex-col items-start gap-1 p-2 rounded bg-layer-01 border border-layer-accent-01 break-words h-[134px] overflow-y-scroll'>
      <p className='font-normal text-text-primary text-left'>{text}</p>
    </div>
  );
}
