import { forwardRef, useCallback, useRef, useState } from 'react';
import { Stack, TextField, InputAdornment, IconButton, Popover, List, Grow } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseIcon from '@mui/icons-material/Close';
import debounce from 'lodash/debounce';
import { CustomSearchListItem } from './CustomSearchListItem';

// Transition component for Popover animation
const Transition = forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const textFieldRef = useRef(null);

  // Debounced search function to limit API calls
  const debouncedSearch = useCallback(
    debounce(async (term) => {
      if (term.length < 2) {
        setSearchResults([]);
        setIsPopoverOpen(false);
        return;
      }
      try {
        const results = await onSearch(term);
        setSearchResults(results);
        setIsPopoverOpen(results.length > 0);
      } catch (error) {
        console.error('Error searching coffee shops:', error);
        setSearchResults([]);
        setIsPopoverOpen(false);
      }
    }, 300),
    [onSearch],
  );

  // Handle search input change
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // Clear search input and results
  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setIsPopoverOpen(false);
  };

  // Close popover if clicked outside
  const handlePopoverClose = (event) => {
    if (textFieldRef.current && !textFieldRef.current.contains(event.target)) {
      setIsPopoverOpen(false);
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        ref={textFieldRef}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon sx={{ fontSize: '20px' }} />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear search"
                onClick={handleClearSearch}
                edge="end"
                size="small"
              >
                <CloseIcon sx={{ fontSize: '18px' }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={(theme) => ({
          flexGrow: 1,
          '& .MuiOutlinedInput-root': {
            borderRadius: '6px',
            fontSize: '0.875rem',
            height: '40px',
            '&.Mui-focused fieldset': {
              border: `1px solid ${theme.palette.primary.main}`,
            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: `1px solid ${theme.palette.grey[550]}`,
          },
        })}
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Popover
        open={isPopoverOpen}
        onClose={handlePopoverClose}
        disableScrollLock
        anchorEl={textFieldRef.current}
        TransitionComponent={Transition}
        TransitionProps={{
          easing: 'cubic-bezier(0.42, 0, 0.58, 1)',
          timeout: 350,
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        slotProps={{
          paper: {
            sx: {
              width: textFieldRef.current ? `${textFieldRef.current.clientWidth}px` : 'auto',
              maxHeight: '300px',
              marginTop: '6px',
              borderRadius: '6px',
            },
          },
        }}
      >
        <List
          sx={{ width: '100%', bgcolor: (theme) => theme.palette.appwhite.main, paddingY: 0.25 }}
        >
          {searchResults.map((shop) => (
            <CustomSearchListItem key={shop._id} shop={shop} />
          ))}
        </List>
      </Popover>
    </Stack>
  );
};

export default SearchBar;
