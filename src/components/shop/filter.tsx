import React, { useEffect, useState } from "react";
import { GetCategory } from "../../api/api";
import { useSnackbar } from "notistack";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

// Define the category type
interface Category {
  _id: string;
  title: string;
  // Add other properties as needed
}

interface ShopFilterProps {
  setCategoryId: (id: string) => void;
}

const ShopFilter: React.FC<ShopFilterProps> = (props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const setCategoryId = props.setCategoryId

  const handleCategoryChange = (id: string) => {
    setCategoryId(id);
  };

  useEffect(() => {
    const getCategory = async () => {
      const result: Category[] = await GetCategory(enqueueSnackbar);
      setCategories(result);
    };
    getCategory();
  }, [enqueueSnackbar]);

  return (
    <div className="shadow-2xl py-10 px-5 flex flex-col">
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="all"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="all"
            control={<Radio onChange={() => handleCategoryChange("all")} />}
            label="all"
          />
          {categories.length > 0 ? (
            categories.map((category) => (
              <div key={category._id} className="category-item">
                <FormControlLabel
                  value={category._id}
                  control={
                    <Radio
                      onChange={() => handleCategoryChange(category._id)}
                    />
                  }
                  label={category.title}
                />
              </div>
            ))
          ) : (
            <div>No categories available</div>
          )}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default ShopFilter;
