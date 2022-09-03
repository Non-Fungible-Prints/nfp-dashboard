import { SectionTemplate } from './SectionTemplate';

export const Hero = () => (
  <SectionTemplate id="hero">
    <div className="relative min-h-screen max-w-6xl mx-auto flex">
      <div className="mt-16 text-center bg-black">
        <div className="my-24">
          <h1 className="text-3xl font-bold text-gray-200 mb-8">
            Non Fungible
            {' '}
            <a className="text-purple-700">PRINTS</a>
          </h1>
        </div>

      </div>
    </div>
  </SectionTemplate>
);
