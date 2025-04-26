export type BrowseCondition = {
  page?: number;
  limit?: number;
  search?: string;

  search_by?: string;
  sort?: { key: string; order: "asc" | "desc" }[];

  where?: { key: string; value: any }[];
  whereIn?: { key: string; value: any[] };
  whereHas?: { key: string; where: string; value: any };

  with?: string[];
  withExists?: string[];
};
