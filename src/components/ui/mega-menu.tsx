import React from "react";
import Link from "@components/ui/link";
import { useTranslation } from "next-i18next";

interface MenuItem {
  id: number | string;
  path: string;
  label: string;
  columnItemItems?: MenuItem[];
}
type MegaMenuProps = {
  columns: {
    id: number | string;
    columnItems: MenuItem[];
  }[];
};

const MegaMenu: React.FC<MegaMenuProps> = ({ columns }) => {
  const { t } = useTranslation("menu");
  return (
    <div className="absolute bg-gray-200 megaMenu shadow-header ltr:-left-28 rtl:-right-28 ltr:xl:left-0 rtl:xl:right-0 ">
      <div className="grid grid-cols-5">
        {columns?.map((column) => (
          <ul
            className="pt-6 even:bg-gray-150 pb-7 2xl:pb-8 2xl:pt-7 capitalize"
            key={column.id}
          >
            {column?.columnItems?.map((columnItem) => (
              <React.Fragment key={columnItem.id}>
                <li className="mb-1.5">
                  <Link
                    href={columnItem.path}
                    className="block text-sm py-1.5 text-heading font-semibold px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300 capitalize"
                  >
                    {t(columnItem.label)}
                  </Link>
                </li>
                {columnItem?.columnItemItems?.map((item: any) => (
                  <li
                    key={item.id}
                    className={
                      columnItem?.columnItemItems?.length === item.id
                        ? "border-b border-gray-300 pb-3.5 mb-3 capitalize"
                        : ""
                    }
                  >
                    <Link
                      href={item.path}
                      className="text-body text-sm block py-1.5 px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300 capitalize"
                    >
                      {t(item.label)}
                    </Link>
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;
