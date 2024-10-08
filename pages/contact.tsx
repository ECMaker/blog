import type { NextPage } from 'next';

import { NextSeo } from 'next-seo';

import { ContactTemplate } from '~/templates/ContactTemplate';

const Contact: NextPage = () => {
  return (
    <>
      <ContactTemplate />
      {/* meta */}
      <NextSeo
        title="Contact | EC maker"
        openGraph={{
          url: 'https://blog.ec-maker.com/contact/',
        }}
      />
    </>
  );
};

export default Contact;
