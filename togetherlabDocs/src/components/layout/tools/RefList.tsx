type RefMenuType = {
  id: number;
  label: string;
};

interface RefListProps {
  title: string;
  list: RefMenuType[];
}

function RefList({ title, list }: RefListProps) {
  return (
    <ul className="flex flex-col gap-0 text-sm">
      <li>
        <h5 className="mb-3 cursor-pointer">{title}</h5>
      </li>
      {list?.map((item) => (
        <li key={`ref-list-${item.id}`}>
          <h6 className="border-l-[1px] border-slate-50/20 pl-5 py-1 hover:text-slate-50/80 hover:border-slate-50/80 cursor-pointer">
            {item.label}
          </h6>
        </li>
      ))}
    </ul>
  );
}

export default RefList;
