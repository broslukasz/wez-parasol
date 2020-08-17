export interface WeatherbitForecastData {
    app_temp: number;
    clouds: number;
    clouds_hi: number;
    clouds_low: number;
    clouds_mid: number;
    datetime: string;
    dewpt: 16.5;
    dhi: number;
    dni: number;
    ghi: number;
    ozone: number;
    pod: string;
    pop: number;
    precip: number;
    pres: number;
    rh: 46;
    slp: number;
    snow: number;
    snow_depth: number;
    solar_rad: number;
    temp: number;
    timestamp_local: string;
    timestamp_utc: string;
    ts: number;
    uv: number;
    vis: number;
    weather: {
        code: number;
        description: string;
        icon: string;
    };
    wind_cdir: string;
    wind_cdir_full: string;
    wind_dir: number;
    wind_gust_spd: number;
    wind_spd: number;
}

export interface WeatherbitHourlyForecast {
    city_name: string;
    country_code: string;
    data: WeatherbitForecastData[];
    lat: number;
    lon: number;
    state_code: string;
    timezone: string;
}
