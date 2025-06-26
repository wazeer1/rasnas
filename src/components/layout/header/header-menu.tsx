import Link from "@components/ui/link";
import { FaChevronDown } from "react-icons/fa";
import MegaMenu from "@components/ui/mega-menu";
import classNames from "classnames";
import ListMenu from "@components/ui/list-menu";
import { useTranslation } from "next-i18next";

interface MenuProps {
  data: any;
  categoryData: any;
  className?: string;
}

const HeaderMenu: React.FC<MenuProps> = ({ data, categoryData, className }) => {
  const { t } = useTranslation("menu");
  
  return (
    <nav className={classNames(`headerMenu flex w-full relative`, className)}>
      {categoryData?.map((item: any) => (
        <div
          className={`menuItem group cursor-pointer py-7 ${
            item.subcategories ? "relative" : ""
          }`}
          key={item.id}
        >
          <Link
            href={`products?category=${item.name}`}
            className="relative inline-flex items-center px-3 py-2 text-sm font-normal xl:text-base text-heading xl:px-4 group-hover:text-gray-500 capitalize"
          >
            {item.name}
            {/* {t(item.label)} */}
            {item.subcategories.length > 0 && (
              <span className="opacity-30 text-xs mt-1 xl:mt-0.5 w-4 flex justify-end">
                <FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
              </span>
            )}
          </Link>

          {item?.columns && Array.isArray(item.columns) && (
            <MegaMenu columns={item.columns} />
          )}

          {item?.subcategories &&
            item.subcategories.length > 0 &&
            Array.isArray(item.subcategories) && (
              <div className="absolute invisible bg-gray-200 opacity-0 group-hover:visible subMenu shadow-header ltr:left-0 rtl:right-0 group-hover:opacity-100">
                <ul className="py-5 text-sm text-body">
                  {item.subcategories.map((menu: any, index: number) => {
                    const dept: number = 1;
                    const menuName: string = `sidebar-menu-${dept}-${index}`;

                    return (
                      <ListMenu
                        dept={dept}
                        data={menu}
                        hasSubMenu={menu.subcategories}
                        menuName={menuName}
                        key={menuName}
                        menuIndex={index}
                      />
                    );
                  })}
                </ul>
              </div>
            )}
        </div>
      ))}
    </nav>
  );
};

export default HeaderMenu;
