import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const TableDisplay = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://localhost:9000/api/Categories", {
        withCredentials: false,
      });
      console.log("Full API Response for Categories:", response);
      console.log("API Response Data for Categories:", response.data);

      // Handle different response structures
      let categoryData = response.data;
      if (!Array.isArray(categoryData)) {
        if (categoryData && typeof categoryData === "object" && Array.isArray(categoryData.data)) {
          categoryData = categoryData.data; // Handle { data: [...] }
        } else {
          console.warn("Categories data is not an array or valid object:", response.data);
          setCategories([]);
          setError("No categories found in response or invalid data format.");
          return;
        }
      }

      const mappedCategories = categoryData.map(category => ({
        id: category.Id || category.id || category.CategoryId || category.categoryId, // Handle case variations
        name: category.Name || category.name || category.CategoryName || category.categoryName, // Handle case variations
      }));
      setCategories(mappedCategories);
      setError(null);
    } catch (error) {
      console.error("Error fetching categories:", error.message, error.response?.data);
      setError("Failed to fetch categories. Please try again. Check console for details.");
      setCategories([]);
    }
  };

  return (
    <Box>
      {error ? (
        <Typography
          variant="body2"
          sx={{ color: "#EF4444", textAlign: "center", mb: 2 }}
        >
          {error}
        </Typography>
      ) : categories.length === 0 ? (
        <Typography
          variant="body2"
          sx={{ color: "#444", textAlign: "center", mb: 2 }}
        >
          No categories available.
        </Typography>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            backgroundColor: "rgba(255,255,255,0.9)",
          }}
        >
          <Table aria-label="category table">
            <TableHead>
              <TableRow
                sx={{
                  background: "linear-gradient(90deg, #E5E7EB 0%, #D1D5DB 100%)",
                }}
              >
                <TableCell sx={{ fontWeight: "bold", color: "#1E3A8A", py: 2 }}>
                  Category ID
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#1E3A8A", py: 2 }}>
                  Category Name
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category, index) => (
                <motion.tr
                  key={category.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <TableCell sx={{ color: "#444", py: 1.5 }}>
                    {category.id}
                  </TableCell>
                  <TableCell sx={{ color: "#444", py: 1.5 }}>
                    {category.name}
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TableDisplay;