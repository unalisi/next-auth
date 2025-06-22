import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hakkımızda | KayraExport',
  description: 'Yılların tecrübesiyle ev tekstili ve dekorasyon ürünlerinde kalite ve zarafeti bir araya getiriyoruz. Misyonumuzu ve vizyonumuzu keşfedin.',
};

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-600">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
  </svg>
);


export default function AboutUsPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text */}
          <div className="text-center lg:text-left">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Hakkımızda</h2>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Kalite ve Zarafetin Buluştuğu Yer
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              KayraExport olarak, yılların getirdiği tecrübe ve tutkuyla evlerinize dokunuyoruz. 
              Amacımız, en kaliteli malzemeleri modern tasarımlarla birleştirerek yaşam alanlarınıza
              sıcaklık ve şıklık katmaktır.
            </p>
            
            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
              <div className="relative pl-9">
                <dt className="flex items-center font-semibold text-gray-900">
                  <CheckCircleIcon />
                  <span className="ml-2">Müşteri Memnuniyeti</span>
                </dt>
                <dd className="inline ml-1">
                  Her zaman önceliğimiz, beklentilerinizi aşan ürün ve hizmetler sunmaktır.
                </dd>
              </div>
              <div className="relative pl-9">
                <dt className="flex items-center font-semibold text-gray-900">
                  <CheckCircleIcon />
                  <span className="ml-2">Yenilikçi Tasarım</span>
                </dt>
                <dd className="inline ml-1">
                  Geleneksel dokuları modern trendlerle harmanlayarak zamansız parçalar yaratıyoruz.
                </dd>
              </div>
              <div className="relative pl-9">
                <dt className="flex items-center font-semibold text-gray-900">
                  <CheckCircleIcon />
                  <span className="ml-2">Sürdürülebilirlik</span>
                </dt>
                <dd className="inline ml-1">
                  Doğaya saygılı üretim süreçleri ve çevre dostu malzemelerle geleceğe yatırım yapıyoruz.
                </dd>
              </div>
            </dl>
          </div>

          {/* Video */}
          <div className="w-full h-auto flex items-center justify-center">
            <video
              src="https://www.kayraexport.com/video/Kayraexport.mp4"
              className="rounded-2xl shadow-2xl w-full h-full object-cover"
              autoPlay  
              loop      
              muted     
              playsInline 
            >
              Tarayıcınız video etiketini desteklemiyor.
            </video>
          </div>

        </div>
      </div>
    </div>
  );
}