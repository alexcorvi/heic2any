import "./libheif";
declare function heic2any({ blob, toType, quality }: {
    blob: Blob;
    toType?: string;
    quality?: number;
}): Promise<Blob>;
export default heic2any;
