import { MEDIA_MANIFEST } from './media-manifest';

export interface Track {
  title: string;
  url: string;
}

export interface Artist {
  id: number;
  name: string;
  slug: string;
  bio: string;
  photo: string | null;
  label: string;
  genres: string[];
  social?: {
    instagram?: string;
    soundcloud?: string;
    website?: string;
  };
  discography?: Track[];
}

export const ARTISTS: Artist[] = [
  {
    id: 1,
    name: 'JEAN FONCÉ',
    slug: 'jean-fonce',
    bio: 'Visual alchemist and filmmaker redefining the aesthetic of the diaspora.',
    photo: MEDIA_MANIFEST.ARTISTS.JEAN_FONCE,
    label: 'DJ / Producer',
    genres: ['Electronic', 'Experimental', 'Ambient'],
    social: { instagram: 'jean.fonceee', soundcloud: 'jean_fonceee' },
    discography: [
      { title: 'elusive shadows', url: 'https://soundcloud.com/jean_fonceee/elusive-shadows' },
      { title: 'forgotten breaths', url: 'https://soundcloud.com/jean_fonceee/forgotten-breaths' },
      { title: 'FFZ Radio X FONCÉ [22.2.24]', url: 'https://soundcloud.com/jean_fonceee/ffz-radio-x-fonce-22224' },
    ]
  },
  {
    id: 2,
    name: 'HAUSVRAU',
    slug: 'hausvrau',
    bio: 'Avant-garde selector and community builder redefining the underground narrative.',
    photo: MEDIA_MANIFEST.ARTISTS.HAUSFRAU,
    label: 'DJ / Producer',
    genres: ['Electronic', 'House', 'Techno', 'Experimental'],
    social: { instagram: 'hausvrauchururu', soundcloud: 'hausvrau', website: 'hausvrau.bandcamp.com/music' },
    discography: [
      { title: 'POWER', url: 'https://soundcloud.com/hausvrau/4-power-4' },
    ]
  },
  {
    id: 3,
    name: 'SAHARAA',
    slug: 'saharaa',
    bio: 'Ethereal vocalist and sound designer blending traditional textures with futuristic soundscapes.',
    photo: MEDIA_MANIFEST.ARTISTS.SAHARAA,
    label: 'DJ / Producer',
    genres: ['Electronic', 'Ambient', 'World'],
    social: { instagram: 'sally.sar.a', soundcloud: 'dj_saharaa' },
    discography: [
      { title: 'Saharaa @Bina 030322', url: 'https://soundcloud.com/dj_saharaa/saharaa-bina-030322' },
      { title: 'Zürich Fashion Week Opening Night', url: 'https://soundcloud.com/dj_saharaa/zuerich-fashion-week-opening' },
    ]
  },
  {
    id: 4,
    name: 'MALEFI',
    slug: 'malefi',
    bio: 'Sonic experimentalist focused on the rhythmic complexities of the African continent.',
    photo: MEDIA_MANIFEST.ARTISTS.MALIFI,
    label: 'DJ / Producer',
    genres: ['Electronic', 'Afro', 'Experimental'],
    social: { instagram: 'm_a_l_e_f_i', soundcloud: 'malefizulu' },
    discography: [
      { title: 'MUVA MALEFI', url: 'https://soundcloud.com/malefizulu/muva-malefi-mix' },
      { title: 'STILL OUTSIDE… MIX', url: 'https://soundcloud.com/malefizulu/outside-outside' },
    ]
  },
  {
    id: 5,
    name: 'PHUM',
    slug: 'phum',
    bio: 'Multi-instrumentalist and composer crafting immersive auditory journeys.',
    photo: MEDIA_MANIFEST.ARTISTS.PHUM,
    label: 'DJ / Producer',
    genres: ['Electronic', 'Ambient', 'Jazz', 'Experimental'],
    social: { instagram: 'thatssophum', soundcloud: 'thatsophum' },
    discography: [
      { title: 'trapsouls (playlist)', url: 'https://soundcloud.com/thatsophum/sets/trapsouls' },
      { title: 'between us (playlist)', url: 'https://soundcloud.com/thatsophum/sets/between-us' },
    ]
  },
  {
    id: 6,
    name: 'MALDITA VAINA',
    slug: 'maldita-vaina',
    bio: 'Provocative visual artist and performer challenging digital and physical boundaries.',
    photo: MEDIA_MANIFEST.ARTISTS.MALDITA_VAINA,
    label: 'DJ / Producer',
    genres: ['Electronic', 'Experimental', 'Industrial'],
    social: { instagram: 'maldita.vaina', soundcloud: 'malditavaina', website: 'malditavaina.soy' },
    discography: [
      { title: 'MALDITA VAINA Guest Mix', url: 'https://soundcloud.com/malditavaina/2024-08-22-malditavaina-x-bushbby-foundationfm-london' },
      { title: 'Especial Mix 006 (on DSCLNZCN)', url: 'https://soundcloud.com/desculonizacion/especial-mix-maldita-vaina' },
    ]
  },
];
