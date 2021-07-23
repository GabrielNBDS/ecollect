import Head from 'next/head';
import React from 'react';

interface IProps {
  title: string;
  description?: string;
  image?: string;
  ogWidth?: string;
  ogHeight?: string;
  shouldExcludeTitleSuffix?: boolean;
  shouldIndexPage?: boolean;
}

const SEO: React.FC<IProps> = ({
  title,
  description,
  image,
  ogHeight,
  ogWidth,
  shouldExcludeTitleSuffix = false,
  shouldIndexPage = false,
}) => {
  const pageTitle = `${title} ${!shouldExcludeTitleSuffix ? '| Ecollect' : ''}`;

  const pageImage = image || 'https://ecollect.gabrielnbds.dev/assets/logo.png';

  return (
    <Head>
      <title>{pageTitle}</title>
      {description && <meta name="description" content={description} />}

      <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
      <meta name="MobileOptimized" content="320" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta name="google" content="notranslate" />

      <meta property="og:title" content={pageTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={pageTitle} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:secure_url" content={pageImage} />
      <meta property="og:image:alt" content="Thumbnail" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content={ogWidth || '195px'} />
      <meta property="og:image:height" content={ogHeight || '44px'} />

      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:image:src" content={pageImage} />
      <meta name="twitter:image:alt" content="Thumbnail" />
      <meta name="twitter:image:width" content={ogWidth || '195px'} />
      <meta name="twitter:image:height" content={ogHeight || '44px'} />

      {!shouldIndexPage && <meta name="robots" content="noindex,nofollow" />}
    </Head>
  );
};

export default SEO;
