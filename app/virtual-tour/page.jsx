import Title from '@/components/ui/Title';

export const metadata = {
  title: "Virtual Tour | Pixoul Gaming",
};

export default function VirtualTourPage() {
  return (
    <>
    <div className='py-10'>
      <Title align="center">360° Virtual Tour</Title>
    </div>
      

      <div style={{ width: "100%", height : "100vh" }}>
        
      <iframe
        src="https://my.matterport.com/show/?m=YpfVPkKsp5E"
        width="100%"
        height="100%"
        style={{ border: "0" }}
        allow="fullscreen; vr"
        allowFullScreen
        loading="lazy"
      />
    </div>
    </>
  );
}




