import { Tabs, TabsList, TabsTrigger } from "../ui/Tabs";
import { Search } from "lucide-react";
import { Input } from "../ui/Input";

type ChallengeFiltersProps = {
  activeCategory: string;
  setActiveCategory: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

export default function ChallengeFilters({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
}: ChallengeFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="bg-gray-800">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="web">Web</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="forensics">Forensics</TabsTrigger>
          <TabsTrigger value="reverse">Reverse</TabsTrigger>
          <TabsTrigger value="pwn">Pwn</TabsTrigger>
          <TabsTrigger value="misc">Misc</TabsTrigger>
          <TabsTrigger value="osint">Osint</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="relative w-full md:w-60">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input
          className="bg-gray-800 border-gray-700 pl-10"
          placeholder="Search challenges..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
