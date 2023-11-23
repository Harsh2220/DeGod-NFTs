export type Item = {
    contract_name: ContractName;
    contract_ticker_symbol: ContractTickerSymbol;
    contract_address: ContractAddress;
    is_spam: boolean;
    type: Type;
    nft_data: NftData;
}

export enum ContractAddress {
    The0X8821Bee2Ba0Df28761Afff119D66390D594Cd280 = "0x8821bee2ba0df28761afff119d66390d594cd280",
}

export enum ContractName {
    DeGods = "DeGods",
}

export enum ContractTickerSymbol {
    Degods = "DEGODS",
}

export type NftData = {
    token_id: string;
    token_url: string;
    original_owner: string;
    external_data: ExternalData;
    asset_cached: boolean;
    image_cached: boolean;
}

export type ExternalData = {
    name: string;
    description: string;
    asset_url: string;
    asset_file_extension: AssetFileExtension;
    asset_mime_type: AssetMIMEType;
    asset_size_bytes: string;
    image: string;
    image_256: string;
    image_512: string;
    image_1024: string;
    animation_url: null | string;
    external_url: null | string;
    attributes: Attribute[];
}

export enum AssetFileExtension {
    HTML = "html",
    PNG = "png",
}

export enum AssetMIMEType {
    ImagePNG = "image/png",
    TextHTML = "text/html",
}

export type Attribute = {
    trait_type: string;
    value: string;
}

export enum Type {
    Nft = "nft",
}

export type Pagination = {
    has_more: boolean;
    page_number: number;
    page_size: number;
    total_count: number;
}