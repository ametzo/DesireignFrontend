import React, { useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

import { useHandleClickOutside } from "../hooks";

export default function MultipleSelectDropdown({
    data,
    selectedData,
    setSelectedData,
    valueName,
    displayName,
    randomIndex = 0,
    bracketName,
    disabled,
    isForModal = false,
    selectAll = false,
}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownData, setDropdownData] = useState({
        width: "0",
        left: "0",
        top: "0",
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [isSelectAll, setIsSelectAll] = useState(false);

    const wrapperRef = useRef();
    useHandleClickOutside(wrapperRef, () => setIsDropdownOpen(false));

    const filteredData = searchQuery
        ? data?.filter((item) =>
              item[displayName]
                  ?.toLowerCase()
                  ?.includes(searchQuery?.toLowerCase())
          )
        : data;

    const removeSelectedItem = (selectedItem) => {
        const filteredItems = selectedData.filter((item) => {
            return item?.toString() !== selectedItem;
        });
        setSelectedData(filteredItems);
    };

    const handleScreenChange = () => {
        const parent = wrapperRef.current.getBoundingClientRect();

        const scrollLeft =
            window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

        setDropdownData((prev) => {
            return {
                ...prev,
                width: parent.width,
                left: parent.left + scrollLeft,
                top: parent.top + parent.height + (!isForModal && scrollTop),
            };
        });
    };

    return (
        <div className="" ref={wrapperRef}>
            <div
                className="border border-[#ced4da] rounded text-[#212529] h-[40px] text-sm cursor-pointer"
                onClick={() => {
                    if (isDropdownOpen === false) {
                        setSearchQuery("");
                    }
                    if (!disabled) {
                        handleScreenChange();
                        setIsDropdownOpen(true);
                    }
                }}
            >
                {isDropdownOpen ? (
                    <div className="relative w-full h-full">
                        <input
                            type="text"
                            className="h-[100%] w-[100%] border-0"
                            value={searchQuery || ""}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                            }}
                            autoFocus
                        />
                        {!searchQuery && (
                            <span className="absolute top-[50%] left-0 translate-y-[-50%] px-[15px] capitalize">
                                {selectedData?.length} items selected
                            </span>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center justify-between h-full w-full px-3">
                        {selectedData?.length} items selected
                        <span>
                            <FiChevronDown />
                        </span>
                    </div>
                )}
            </div>
            <div
                className={
                    `z-50 absolute top-[100%] left-0 w-full bg-white shadow-lg rounded max-h-[200px] overflow-y-auto ` +
                    (isDropdownOpen === false
                        ? "invisible opacity-0"
                        : "visible opacity-100")
                }
                style={{
                    width: `${dropdownData.width}px`,
                    left: `${dropdownData.left}px`,
                    top: `${dropdownData.top}px`,
                }}
            >
                {filteredData?.length < 1 ? (
                    <div className="p-2">
                        <span className="text-grayColor font-medium text-center block text-sm">
                            Search not found!
                        </span>
                    </div>
                ) : (
                    <>
                        {selectAll && !searchQuery.length > 0 && (
                            <label
                                htmlFor={`multi-select-select-all-1`}
                                key={"select-all-1"}
                                className="flex items-center gap-[10px] px-[0.9rem] hover:bg-blue-500 hover:text-white py-1 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    className="w-[15px] h-[15px] min-w-[15px] min-h-[15px]"
                                    id={`multi-select-select-all-1`}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedData(
                                                filteredData.map(
                                                    (item) => item[valueName]
                                                )
                                            );
                                            setIsSelectAll(true);
                                        } else {
                                            setSelectedData([]);
                                            setIsSelectAll(false);
                                        }
                                    }}
                                    checked={isSelectAll}
                                />
                                <span className="capitalize">Select All</span>
                            </label>
                        )}
                        {filteredData?.map((item) => {
                            return (
                                <label
                                    htmlFor={`multi-select-${item[valueName]}-${randomIndex}`}
                                    key={item[valueName]}
                                    className="font-medium flex items-center gap-[10px] px-[0.9rem] hover:bg-blue-500 hover:text-white py-1 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        className="w-[15px] h-[15px] min-w-[15px] min-h-[15px]"
                                        id={`multi-select-${item[valueName]}-${randomIndex}`}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedData([
                                                    ...selectedData,
                                                    item[valueName],
                                                ]);
                                            } else {
                                                removeSelectedItem(
                                                    item[valueName]
                                                );
                                            }
                                            if (selectAll) {
                                                (e?.target?.checked
                                                    ? selectedData?.length + 1
                                                    : selectedData?.length -
                                                      1) ===
                                                filteredData?.length
                                                    ? setIsSelectAll(true)
                                                    : setIsSelectAll(false);
                                            }
                                        }}
                                        checked={selectedData?.includes(
                                            item[valueName]
                                        )}
                                    />
                                    <span className="capitalize">
                                        {item[displayName]}{" "}
                                        {bracketName &&
                                            `(${item[bracketName]})`}
                                    </span>
                                </label>
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
}
