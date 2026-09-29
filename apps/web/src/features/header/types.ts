import { Btn, StrapiImage } from "@/types";

export interface HeaderData {
  id: number;
  documentId: string;
  logo: StrapiImage;
  navLinks: Btn[];
  ctaBtns: Btn[];
}
