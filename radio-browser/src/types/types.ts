export type RadioStationType = {
    changeuuid: string;
    stationuuid: string;
    serveruuid: string;
    name: string;
    url: string;
    url_resolved: string;
    homepage: string;
    favicon: string;
    tags: string;
    country: string;
    countrycode: string;
    iso_3166_2: string | null;
    state: string;
    language: string;
    languagecodes: string;
    votes: number;
    lastchangetime: string;
    lastchangetime_iso8601: string;
    codec: string;
    bitrate: number;
    hls: number;
    lastcheckok: number;
    lastchecktime: string;
    lastchecktime_iso8601: string;
    lastcheckoktime: string;
    lastcheckoktime_iso8601: string;
    lastlocalchecktime: string;
    lastlocalchecktime_iso8601: string;
    clicktimestamp: string;
    clicktimestamp_iso8601: string;
    clickcount: number;
    clicktrend: number;
    ssl_error: number;
    geo_lat: number | null;
    geo_long: number | null;
    has_extended_info: boolean;
  }

  export type FiltersType = "country" | "language" | "name" | undefined

  export type PropsType = {
    favoriteRadios: RadioStationType[];
    toggleFavorite: (radio: RadioStationType) => void
    currentRadioPlaying?: RadioStationType | undefined
    setCurrentRadioPlaying?: (radio: RadioStationType) => void
  }

  export type PropsPlayingType = {
    currentRadioPlaying: RadioStationType | undefined
  }

  export type DescriptionsRadios = {
    [key: string]: string;
  }

  export type ReproductionData = {
    volume: number;
  }