for admin dashboard
User flow:user logs in (as admin) get redirected to admin dashboard
Data flow:after successful authentication, on mount of dashboard request to backend goes for last week feedback summary. After that user can select date from & to which date he want to see feedback summary. In a separate component he can see the raw data or can download in csv format
Failure modes: 
- Validation fails
- Auth token missing/expired
- Rate limit exceeded (I have not implemented rate limiting)
- Network timeout

Edge cases:can't think of any edge case for this
What if service is down?: Frontend:
    - Disable submit button
    - Show retry message
When service is down, the frontend should poll the backend until it get successful response (is it a good way?)
- Backend:
    - Timeout requests (meaning?)
    - Return clear error code
- Optional:
    - Queue feedback for retry (advanced)
How do we scale reads?Index DB on `createdAt`, `category`
    
- Paginate admin dashboard
    
- Aggregate weekly summaries instead of raw reads
    
- Cache summaries (later)


How do we validate input?   zod in the service layer

next steps: 
