## TO DO

### Using `Suspense` and fallback
  - Use in place of undefined check and `useEffect`/`useState` for setting table data
  - Break up `Advocates` into interactive component and async data fetching hook
  - Add error state in conjunction with `Suspense`


### Search
Add further cleanup to search input to account for user leaving out punctuation


### Pagination

#### Client
Finish logic and styling for navigating across table pages and resetting number of items per page (dependent on backend changes)

#### API
Paginated data fetching
  - Split data into smaller, more efficient chunks
  - Include info that provides total number of items for pagination UI (e.g. calculating total number of pages/current page/next page/prev page as user navigates through or changes the number of items displayed per page)
  - Include pointer to request for next and previous shards of data for navigating across pages (can subsequently be cached on the FE)


### `Table` component
Create a generic recursive data mapping of `<tr>` elements for broader types of arrays (not limited to arrays of advocates)


### `Advocates` component search function
Clean up redundant filtering logic on data


### Styling
Switch out inline styling and custom components for Tailwind versions (NOTE: I *wanted to show knowledge of CSS + HTML, along with quick personal design decisions)


### Additional UI features
Add filtering in addition to search for common categories (e.g. degrees, specialties)



