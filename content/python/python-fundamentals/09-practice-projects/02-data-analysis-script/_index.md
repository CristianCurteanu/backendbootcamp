---
title: 'Data analysis script'
linkTitle: 'Data analysis script'
weight: 2
---

Data analysis is one of Python's most powerful applications. In this section, we'll create a comprehensive data analysis script that demonstrates how to load, clean, analyze, and visualize data using Python libraries. This practical project will consolidate many of the concepts we've learned throughout the tutorial.

## Project Overview

We will build a data analysis script that:
1. Loads data from a CSV file
2. Cleans and preprocesses the data
3. Performs exploratory data analysis
4. Creates visualizations to communicate insights
5. Saves the results to files

## Required Libraries

For this project, we'll use several popular Python libraries for data analysis:

```python
# Core libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
import os

# Configure visualizations
plt.style.use('seaborn-v0_8-whitegrid')
sns.set(font_scale=1.2)
```

To install these libraries, you can use pip:

```bash
pip install pandas numpy matplotlib seaborn
```

## Sample Dataset

For this tutorial, we'll use a sample sales dataset. You can create this sample data file or use your own CSV file:

```python
def create_sample_data():
    """Create a sample sales dataset if one doesn't exist."""
    if not os.path.exists('sales_data.csv'):
        # Create some sample data
        np.random.seed(42)  # For reproducibility
        
        # Date range
        dates = pd.date_range(start='2022-01-01', end='2022-12-31', freq='D')
        
        # Product categories
        categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Toys']
        
        # Create a DataFrame
        n_records = 1000
        
        data = {
            'Date': np.random.choice(dates, n_records),
            'Product_ID': ['P' + str(i).zfill(4) for i in np.random.randint(1, 101, n_records)],
            'Category': np.random.choice(categories, n_records),
            'Price': np.round(np.random.uniform(10, 1000, n_records), 2),
            'Quantity': np.random.randint(1, 10, n_records),
            'Customer_ID': ['C' + str(i).zfill(4) for i in np.random.randint(1, 201, n_records)],
            'Region': np.random.choice(['North', 'South', 'East', 'West', 'Central'], n_records)
        }
        
        # Add some missing values
        for col in ['Price', 'Quantity', 'Region']:
            mask = np.random.random(n_records) < 0.05  # 5% missing values
            data[col] = np.where(mask, np.nan, data[col])
        
        # Create DataFrame and save to CSV
        df = pd.DataFrame(data)
        df.to_csv('sales_data.csv', index=False)
        print("Sample data created and saved to 'sales_data.csv'")
    else:
        print("Using existing 'sales_data.csv' file")
```

## 1. Loading the Data

First, let's load the data from our CSV file:

```python
def load_data(file_path):
    """
    Load data from a CSV file into a pandas DataFrame.
    
    Args:
        file_path (str): Path to the CSV file
        
    Returns:
        pd.DataFrame: The loaded data
    """
    try:
        # Read the CSV file
        df = pd.read_csv(file_path)
        
        # Print basic information
        print(f"Data loaded successfully from {file_path}")
        print(f"Shape: {df.shape} (rows, columns)")
        print("\nFirst 5 rows:")
        print(df.head())
        
        return df
    
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        return None
    except Exception as e:
        print(f"Error loading data: {e}")
        return None
```

## 2. Data Cleaning and Preprocessing

Now, let's clean and preprocess the data:

```python
def clean_data(df):
    """
    Clean and preprocess the data.
    
    Args:
        df (pd.DataFrame): The raw data
        
    Returns:
        pd.DataFrame: The cleaned data
    """
    if df is None:
        return None
    
    # Make a copy to avoid modifying the original
    df_clean = df.copy()
    
    print("\n===== Data Cleaning =====")
    
    # Check for missing values
    missing_values = df_clean.isnull().sum()
    print("\nMissing values per column:")
    print(missing_values)
    
    # Handle missing values
    # For numeric columns, fill with median
    numeric_cols = df_clean.select_dtypes(include=['number']).columns
    for col in numeric_cols:
        if df_clean[col].isnull().sum() > 0:
            median_value = df_clean[col].median()
            df_clean[col].fillna(median_value, inplace=True)
            print(f"Filled missing values in '{col}' with median: {median_value}")
    
    # For categorical columns, fill with mode
    categorical_cols = df_clean.select_dtypes(include=['object']).columns
    for col in categorical_cols:
        if df_clean[col].isnull().sum() > 0:
            mode_value = df_clean[col].mode()[0]
            df_clean[col].fillna(mode_value, inplace=True)
            print(f"Filled missing values in '{col}' with mode: {mode_value}")
    
    # Convert Date column to datetime
    if 'Date' in df_clean.columns:
        df_clean['Date'] = pd.to_datetime(df_clean['Date'])
        print("Converted 'Date' column to datetime")
    
    # Create derived columns
    if 'Date' in df_clean.columns:
        df_clean['Month'] = df_clean['Date'].dt.month
        df_clean['Day'] = df_clean['Date'].dt.day
        df_clean['DayOfWeek'] = df_clean['Date'].dt.dayofweek  # 0=Monday, 6=Sunday
        print("Created date-related columns: Month, Day, DayOfWeek")
    
    # Calculate total sales
    if 'Price' in df_clean.columns and 'Quantity' in df_clean.columns:
        df_clean['Total_Sales'] = df_clean['Price'] * df_clean['Quantity']
        print("Created 'Total_Sales' column")
    
    # Check for duplicates
    duplicates = df_clean.duplicated().sum()
    print(f"\nDuplicate rows: {duplicates}")
    if duplicates > 0:
        df_clean = df_clean.drop_duplicates()
        print(f"Removed {duplicates} duplicate rows")
    
    print(f"\nShape after cleaning: {df_clean.shape} (rows, columns)")
    
    return df_clean
```

## 3. Exploratory Data Analysis

Now that our data is cleaned, let's explore it:

```python
def exploratory_analysis(df):
    """
    Perform exploratory data analysis on the dataset.
    
    Args:
        df (pd.DataFrame): The cleaned data
        
    Returns:
        dict: A dictionary containing analysis results
    """
    if df is None:
        return None
    
    print("\n===== Exploratory Data Analysis =====")
    
    results = {}
    
    # Basic statistics
    print("\nBasic Statistics:")
    numeric_stats = df.describe()
    print(numeric_stats)
    results['numeric_stats'] = numeric_stats
    
    # Category distribution
    if 'Category' in df.columns:
        category_counts = df['Category'].value_counts()
        print("\nProduct Category Distribution:")
        print(category_counts)
        results['category_counts'] = category_counts
    
    # Region distribution
    if 'Region' in df.columns:
        region_counts = df['Region'].value_counts()
        print("\nRegional Distribution:")
        print(region_counts)
        results['region_counts'] = region_counts
    
    # Sales analysis
    if 'Total_Sales' in df.columns:
        print("\nSales Summary:")
        sales_stats = df['Total_Sales'].describe()
        print(sales_stats)
        results['sales_stats'] = sales_stats
        
        # Top 5 products by sales
        if 'Product_ID' in df.columns:
            top_products = df.groupby('Product_ID')['Total_Sales'].sum().sort_values(ascending=False).head(5)
            print("\nTop 5 Products by Sales:")
            print(top_products)
            results['top_products'] = top_products
        
        # Top 5 customers by sales
        if 'Customer_ID' in df.columns:
            top_customers = df.groupby('Customer_ID')['Total_Sales'].sum().sort_values(ascending=False).head(5)
            print("\nTop 5 Customers by Sales:")
            print(top_customers)
            results['top_customers'] = top_customers
        
        # Sales by category
        if 'Category' in df.columns:
            category_sales = df.groupby('Category')['Total_Sales'].sum().sort_values(ascending=False)
            print("\nSales by Category:")
            print(category_sales)
            results['category_sales'] = category_sales
        
        # Sales by region
        if 'Region' in df.columns:
            region_sales = df.groupby('Region')['Total_Sales'].sum().sort_values(ascending=False)
            print("\nSales by Region:")
            print(region_sales)
            results['region_sales'] = region_sales
    
    # Time-based analysis
    if 'Date' in df.columns and 'Total_Sales' in df.columns:
        # Monthly sales
        monthly_sales = df.groupby(df['Date'].dt.strftime('%Y-%m'))['Total_Sales'].sum()
        print("\nMonthly Sales:")
        print(monthly_sales)
        results['monthly_sales'] = monthly_sales
        
        # Day of week analysis
        if 'DayOfWeek' in df.columns:
            day_mapping = {
                0: 'Monday', 1: 'Tuesday', 2: 'Wednesday', 
                3: 'Thursday', 4: 'Friday', 5: 'Saturday', 6: 'Sunday'
            }
            df_copy = df.copy()
            df_copy['DayName'] = df_copy['DayOfWeek'].map(day_mapping)
            day_sales = df_copy.groupby('DayName')['Total_Sales'].sum()
            # Reorder to start with Monday
            day_sales = day_sales.reindex(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
            print("\nSales by Day of Week:")
            print(day_sales)
            results['day_sales'] = day_sales
    
    return results
```

## 4. Data Visualization

Now, let's create visualizations to better understand our data:

```python
def create_visualizations(df, results, output_dir='visualizations'):
    """
    Create visualizations from the data and analysis results.
    
    Args:
        df (pd.DataFrame): The cleaned data
        results (dict): Results from exploratory analysis
        output_dir (str): Directory to save visualizations
    """
    if df is None or results is None:
        return
    
    print("\n===== Creating Visualizations =====")
    
    # Create output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"Created directory: {output_dir}")
    
    # Set figure size for all plots
    plt.figure(figsize=(12, 6))
    
    # 1. Category Sales Bar Chart
    if 'category_sales' in results:
        plt.figure(figsize=(12, 6))
        ax = results['category_sales'].plot(kind='bar', color='skyblue')
        plt.title('Total Sales by Product Category', fontsize=16)
        plt.xlabel('Category', fontsize=14)
        plt.ylabel('Total Sales ($)', fontsize=14)
        plt.xticks(rotation=45)
        plt.grid(axis='y', linestyle='--', alpha=0.7)
        
        # Add value labels on top of each bar
        for i, v in enumerate(results['category_sales']):
            ax.text(i, v + 0.1, f'${v:,.2f}', ha='center', fontsize=10)
            
        plt.tight_layout()
        plt.savefig(f'{output_dir}/category_sales.png')
        plt.close()
        print(f"Saved: {output_dir}/category_sales.png")
    
    # 2. Regional Sales Pie Chart
    if 'region_sales' in results:
        plt.figure(figsize=(10, 8))
        explode = [0.1 if i == 0 else 0 for i in range(len(results['region_sales']))]  # Explode the largest slice
        
        plt.pie(results['region_sales'], labels=results['region_sales'].index, 
                autopct='%1.1f%%', startangle=90, shadow=True, explode=explode,
                colors=sns.color_palette('pastel'))
        plt.title('Sales Distribution by Region', fontsize=16)
        plt.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle
        plt.tight_layout()
        plt.savefig(f'{output_dir}/region_sales_pie.png')
        plt.close()
        print(f"Saved: {output_dir}/region_sales_pie.png")
    
    # 3. Monthly Sales Trend
    if 'monthly_sales' in results:
        plt.figure(figsize=(14, 6))
        ax = results['monthly_sales'].plot(kind='line', marker='o', color='darkblue', linewidth=2)
        
        plt.title('Monthly Sales Trend', fontsize=16)
        plt.xlabel('Month', fontsize=14)
        plt.ylabel('Total Sales ($)', fontsize=14)
        plt.grid(True, linestyle='--', alpha=0.7)
        plt.xticks(rotation=45)
        
        # Add value labels above each point
        for i, v in enumerate(results['monthly_sales']):
            ax.text(i, v + 0.1, f'${v:,.2f}', ha='center', fontsize=9, rotation=45)
            
        plt.tight_layout()
        plt.savefig(f'{output_dir}/monthly_sales_trend.png')
        plt.close()
        print(f"Saved: {output_dir}/monthly_sales_trend.png")
    
    # 4. Day of Week Sales
    if 'day_sales' in results:
        plt.figure(figsize=(12, 6))
        ax = results['day_sales'].plot(kind='bar', color='lightgreen')
        
        plt.title('Sales by Day of Week', fontsize=16)
        plt.xlabel('Day', fontsize=14)
        plt.ylabel('Total Sales ($)', fontsize=14)
        plt.grid(axis='y', linestyle='--', alpha=0.7)
        
        # Add value labels on top of each bar
        for i, v in enumerate(results['day_sales']):
            ax.text(i, v + 0.1, f'${v:,.2f}', ha='center', fontsize=10)
            
        plt.tight_layout()
        plt.savefig(f'{output_dir}/day_of_week_sales.png')
        plt.close()
        print(f"Saved: {output_dir}/day_of_week_sales.png")
    
    # 5. Sales Distribution Histogram
    if 'Total_Sales' in df.columns:
        plt.figure(figsize=(12, 6))
        sns.histplot(df['Total_Sales'], bins=30, kde=True, color='purple')
        
        plt.title('Distribution of Sales Amounts', fontsize=16)
        plt.xlabel('Sale Amount ($)', fontsize=14)
        plt.ylabel('Frequency', fontsize=14)
        plt.grid(axis='y', linestyle='--', alpha=0.7)
        plt.tight_layout()
        plt.savefig(f'{output_dir}/sales_distribution.png')
        plt.close()
        print(f"Saved: {output_dir}/sales_distribution.png")
    
    # 6. Scatter plot of Price vs. Quantity
    if 'Price' in df.columns and 'Quantity' in df.columns:
        plt.figure(figsize=(10, 8))
        
        if 'Category' in df.columns:
            # Scatter plot colored by category
            sns.scatterplot(data=df, x='Price', y='Quantity', hue='Category', size='Total_Sales',
                           sizes=(20, 200), alpha=0.7)
            plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
        else:
            sns.scatterplot(data=df, x='Price', y='Quantity', size='Total_Sales',
                           sizes=(20, 200), alpha=0.7)
        
        plt.title('Price vs. Quantity Relationship', fontsize=16)
        plt.xlabel('Price ($)', fontsize=14)
        plt.ylabel('Quantity', fontsize=14)
        plt.grid(True, linestyle='--', alpha=0.7)
        plt.tight_layout()
        plt.savefig(f'{output_dir}/price_quantity_scatter.png')
        plt.close()
        print(f"Saved: {output_dir}/price_quantity_scatter.png")
    
    # 7. Heatmap of correlations
    numeric_df = df.select_dtypes(include=['number'])
    if len(numeric_df.columns) > 1:  # Need at least 2 numeric columns for correlation
        plt.figure(figsize=(10, 8))
        
        corr = numeric_df.corr()
        mask = np.triu(np.ones_like(corr, dtype=bool))  # Mask for the upper triangle
        
        sns.heatmap(corr, mask=mask, annot=True, cmap='coolwarm', vmin=-1, vmax=1, 
                    fmt=".2f", linewidths=0.5, cbar_kws={"shrink": .8})
        
        plt.title('Correlation Between Numeric Variables', fontsize=16)
        plt.tight_layout()
        plt.savefig(f'{output_dir}/correlation_heatmap.png')
        plt.close()
        print(f"Saved: {output_dir}/correlation_heatmap.png")
    
    print(f"\nAll visualizations have been saved to the '{output_dir}' directory")
```

## 5. Generate Report

Let's create a function to generate a simple text report with our findings:

```python
def generate_report(df, results, output_file='sales_analysis_report.txt'):
    """
    Generate a text report of the analysis findings.
    
    Args:
        df (pd.DataFrame): The cleaned data
        results (dict): Results from exploratory analysis
        output_file (str): File to save the report
    """
    if df is None or results is None:
        return
    
    print("\n===== Generating Report =====")
    
    with open(output_file, 'w') as f:
        # Header
        f.write("=" * 80 + "\n")
        f.write(" " * 30 + "SALES DATA ANALYSIS REPORT\n")
        f.write(" " * 30 + datetime.now().strftime("%Y-%m-%d %H:%M:%S") + "\n")
        f.write("=" * 80 + "\n\n")
        
        # Dataset Overview
        f.write("DATASET OVERVIEW\n")
        f.write("-" * 80 + "\n")
        f.write(f"Total Records: {df.shape[0]}\n")
        f.write(f"Time Period: {df['Date'].min().strftime('%Y-%m-%d')} to {df['Date'].max().strftime('%Y-%m-%d')}\n")
        
        # Key Metrics
        if 'sales_stats' in results:
            f.write("\nKEY SALES METRICS\n")
            f.write("-" * 80 + "\n")
            f.write(f"Total Sales: ${df['Total_Sales'].sum():,.2f}\n")
            f.write(f"Average Sale: ${results['sales_stats']['mean']:,.2f}\n")
            f.write(f"Median Sale: ${results['sales_stats']['50%']:,.2f}\n")
            f.write(f"Highest Sale: ${results['sales_stats']['max']:,.2f}\n")
            f.write(f"Lowest Sale: ${results['sales_stats']['min']:,.2f}\n")
        
        # Category Analysis
        if 'category_sales' in results:
            f.write("\nCATEGORY ANALYSIS\n")
            f.write("-" * 80 + "\n")
            for category, sales in results['category_sales'].items():
                f.write(f"{category}: ${sales:,.2f} ({sales/df['Total_Sales'].sum()*100:.1f}%)\n")
            
            # Best performing category
            best_category = results['category_sales'].idxmax()
            f.write(f"\nBest Performing Category: {best_category} (${results['category_sales'].max():,.2f})\n")
        
        # Regional Analysis
        if 'region_sales' in results:
            f.write("\nREGIONAL ANALYSIS\n")
            f.write("-" * 80 + "\n")
            for region, sales in results['region_sales'].items():
                f.write(f"{region}: ${sales:,.2f} ({sales/df['Total_Sales'].sum()*100:.1f}%)\n")
            
            # Best performing region
            best_region = results['region_sales'].idxmax()
            f.write(f"\nBest Performing Region: {best_region} (${results['region_sales'].max():,.2f})\n")
        
        # Temporal Analysis
        if 'monthly_sales' in results:
            f.write("\nMONTHLY SALES ANALYSIS\n")
            f.write("-" * 80 + "\n")
            for month, sales in results['monthly_sales'].items():
                f.write(f"{month}: ${sales:,.2f}\n")
            
            # Best and worst months
            best_month = results['monthly_sales'].idxmax()
            worst_month = results['monthly_sales'].idxmin()
            f.write(f"\nBest Month: {best_month} (${results['monthly_sales'].max():,.2f})\n")
            f.write(f"Worst Month: {worst_month} (${results['monthly_sales'].min():,.2f})\n")
        
        # Day of Week Analysis
        if 'day_sales' in results:
            f.write("\nDAY OF WEEK ANALYSIS\n")
            f.write("-" * 80 + "\n")
            for day, sales in results['day_sales'].items():
                f.write(f"{day}: ${sales:,.2f}\n")
            
            # Best and worst days
            best_day = results['day_sales'].idxmax()
            worst_day = results['day_sales'].idxmin()
            f.write(f"\nBest Day: {best_day} (${results['day_sales'].max():,.2f})\n")
            f.write(f"Worst Day: {worst_day} (${results['day_sales'].min():,.2f})\n")
        
        # Top Performers
        f.write("\nTOP PERFORMERS\n")
        f.write("-" * 80 + "\n")
        
        if 'top_products' in results:
            f.write("Top 5 Products:\n")
            for product, sales in results['top_products'].items():
                f.write(f"  {product}: ${sales:,.2f}\n")
        
        if 'top_customers' in results:
            f.write("\nTop 5 Customers:\n")
            for customer, sales in results['top_customers'].items():
                f.write(f"  {customer}: ${sales:,.2f}\n")
        
        # Recommendations (placeholder - in a real report, you'd customize these)
        f.write("\nRECOMMENDATIONS\n")
        f.write("-" * 80 + "\n")
        f.write("1. Focus marketing efforts on the best-performing category and region\n")
        f.write("2. Investigate why certain days of the week perform better than others\n")
        f.write("3. Create special promotions for the lowest-performing months\n")
        f.write("4. Implement a loyalty program targeting the top customers\n")
        f.write("5. Consider product bundling for complementary items\n")
        
        # Footer
        f.write("\n" + "=" * 80 + "\n")
        f.write("END OF REPORT\n")
    
    print(f"Report saved to {output_file}")
```

## 6. Main Function

Now, let's put everything together in a main function:

```python
def main():
    """Main function to run the complete data analysis pipeline."""
    print("===== SALES DATA ANALYSIS =====\n")
    
    # Create sample data if needed
    create_sample_data()
    
    # Load the data
    file_path = 'sales_data.csv'
    df = load_data(file_path)
    
    if df is not None:
        # Clean and preprocess the data
        df_clean = clean_data(df)
        
        if df_clean is not None:
            # Perform exploratory analysis
            results = exploratory_analysis(df_clean)
            
            if results is not None:
                # Create visualizations
                create_visualizations(df_clean, results)
                
                # Generate report
                generate_report(df_clean, results)
                
                print("\nAnalysis completed successfully!")
    
    else:
        print("Analysis could not be completed due to data loading issues.")

if __name__ == "__main__":
    main()
```

## Running the Script

To run this data analysis script, save all the functions in a Python file (e.g., `sales_analysis.py`) and execute it:

```bash
python sales_analysis.py
```

## Understanding the Results

After running the script, you'll have:
1. A cleaned dataset
2. Detailed exploratory analysis in the console output
3. Data visualizations saved in the 'visualizations' directory
4. A comprehensive report in 'sales_analysis_report.txt'

## Key Concepts Demonstrated

This data analysis script demonstrates several important concepts:

1. **Data Loading**: Using pandas to read CSV files
2. **Data Cleaning**: Handling missing values, converting data types, and creating derived columns
3. **Exploratory Analysis**: Calculating statistics and aggregations using pandas
4. **Data Visualization**: Creating charts and graphs with matplotlib and seaborn
5. **Report Generation**: Formatting and writing analysis findings to a file
6. **Error Handling**: Using try-except blocks to handle potential issues
7. **Code Organization**: Structuring the code into functions with clear responsibilities

## Extending the Project

You can extend this project in several ways:

1. **Advanced Analysis**:
   - Implement time series forecasting to predict future sales
   - Perform customer segmentation using clustering algorithms
   - Identify correlations and potential causative factors for sales patterns

2. **Interactive Dashboard**:
   - Convert the script to a Jupyter Notebook for interactive analysis
   - Create a web-based dashboard using Dash or Streamlit
   - Add interactive filters to explore different subsets of the data

3. **Automation**:
   - Schedule the script to run automatically at regular intervals
   - Send the report as an email attachment to stakeholders
   - Set up alerts for unusual patterns or significant changes in sales

## Exercises

**Exercise 1:** Modify the script to analyze sales by day of the month. Does the beginning, middle, or end of the month perform better?

**Exercise 2:** Add a function to identify anomalies in the sales data (e.g., unusually high or low sales days).

**Exercise 3:** Extend the visualization function to create a heatmap showing sales by category and region.

**Exercise 4:** Create a function to perform a basic forecast of next month's sales based on historical data.

**Hint for Exercise 1:** Group the data by the 'Day' column you created during preprocessing, then calculate the sum of sales for each day of the month. Visualize the results with a line chart.

```python
# Exercise 1 outline
def analyze_day_of_month(df):
    if 'Day' in df.columns and 'Total_Sales' in df.columns:
        day_sales = df.groupby('Day')['Total_Sales'].sum().reset_index()
        
        plt.figure(figsize=(12, 6))
        plt.plot(day_sales['Day'], day_sales['Total_Sales'], marker='o')
        plt.title('Sales by Day of Month')
        plt.xlabel('Day of Month')
        plt.ylabel('Total Sales ($)')
        plt.grid(True)
        plt.tight_layout()
        plt.savefig('visualizations/day_of_month_sales.png')
        plt.close()
```

In the next section, we'll explore another practical Python project to further enhance your skills.