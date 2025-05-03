export type ImageKey = "homemUm" | "homemDois" | "mulherUm" | "mulherDois";

export interface UserHeaderType {
  user: string;
  job: string;
  image: ImageKey;
}
