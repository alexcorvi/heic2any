import "./libheif";
declare type ResultType = "Blob" | "ImageData";
declare function heic2any({ blob, toType, quality, resolveTo, }: {
    blob: Blob;
    toType?: string;
    quality?: number;
    resolveTo?: ResultType;
}): Promise<Blob | ImageData>;
export default heic2any;
