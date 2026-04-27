export type Region = "Accra" | "Tema" | "Volta" | "Ashanti" | "Eastern" | "Central" | "Western";
export type Group = "A" | "B" | "C";

export type Area = {
  name: string;
  region: Region;
  group: Group;
  aliases: string[];
};

export type TimeTable = Record<string, Record<string, Group>>;

export type OutageWindow = {
  date: string;
  timeRange: string;
  group: Group;
  label: string;
};
