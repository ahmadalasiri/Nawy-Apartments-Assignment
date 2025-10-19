# API Testing with HTTP Files

This folder contains `.http` files for testing the Nawy Apartment Listing API endpoints using REST Client extensions.

## Setup

### For VS Code

Install the **REST Client** extension by Huachao Mao:

- Extension ID: `humao.rest-client`
- [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

### For IntelliJ/WebStorm

The HTTP Client is built-in. Just open any `.http` file and click the play button next to each request.

## Prerequisites

Before testing the API, ensure:

1. **Backend is running**:

   ```bash
   cd backend
   npm run start:dev
   ```

2. **Database is set up**:

   ```bash
   npm run db:push    # Apply schema
   npm run db:seed    # Seed with 50 apartments
   ```

3. **Backend is accessible** at `http://localhost:3001`

## Files

### 📄 `workflow.http`

**Complete end-to-end testing workflow**

- **Start here** for a full system test
- Follow Steps 1-12 in order for typical user journey
- Includes alternative user journeys (budget buyer, luxury buyer, etc.)
- Demonstrates all features: browsing, filtering, searching, creating

**Use case**: Testing the complete user experience from browsing to viewing details

### 📄 `apartments.http`

**All apartment endpoints with examples**

- 40+ test cases covering all functionality
- Organized by category:
  - Basic pagination
  - Search and filtering
  - Get specific apartment
  - Create apartment
  - Edge cases and validation
  - Performance testing

**Use case**: Testing specific features or debugging individual endpoints

## Usage

### Quick Start

1. **Start the backend**:

   ```bash
   npm run start:dev
   ```

2. **Open `workflow.http`** in VS Code

3. **Click "Send Request"** above each request (or use keyboard shortcut)

4. **Review the response** in the right panel

### Using Variables

Each file has variables defined at the top:

```http
@baseUrl = http://localhost:3001/api/v1
@contentType = application/json
```

You can:

- Modify `@baseUrl` for different environments (staging, production)
- Use `{{variable}}` syntax throughout the file
- Override variables by creating an `http-client.env.json` file

### Keyboard Shortcuts

- **VS Code**: `Ctrl+Alt+R` (Windows/Linux) or `Cmd+Alt+R` (Mac)
- **IntelliJ**: `Ctrl+Enter` (Windows/Linux) or `Cmd+Enter` (Mac)

### Copying IDs Between Requests

Many requests require apartment IDs. To copy an ID:

1. Run a list request (e.g., GET all apartments)
2. Copy an `id` from the response
3. Paste it into the specific apartment request URL

**Example**:

```http
### First, get the list
GET {{baseUrl}}/apartments

### Response includes:
{
  "data": [
    { "id": "08a4c886-f202-4909-8f07-d3ce8f5520de", ... }
  ]
}

### Then use the ID
GET {{baseUrl}}/apartments/08a4c886-f202-4909-8f07-d3ce8f5520de
```

## API Endpoints

### List Apartments

```http
GET /api/v1/apartments?page=1&limit=12
```

**Query Parameters**:

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 12, max: 100)
- `search` (optional): Search in name, unit number, project, description
- `project` (optional): Filter by specific project
- `minPrice` (optional): Minimum price in EGP
- `maxPrice` (optional): Maximum price in EGP
- `bedrooms` (optional): Number of bedrooms
- `bathrooms` (optional): Number of bathrooms

**Response**:

```json
{
  "data": [
    {
      "id": "uuid",
      "unitNumber": "A-101",
      "name": "Luxury Garden Apartment",
      "project": "O West",
      "description": "...",
      "price": "4500000",
      "bedrooms": 3,
      "bathrooms": 2,
      "area": "180",
      "images": ["url1", "url2"],
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 12,
    "totalPages": 5
  }
}
```

### Get Apartment by ID

```http
GET /api/v1/apartments/:id
```

**Response**: Single apartment object

### Get Unique Projects

```http
GET /api/v1/apartments/projects
```

**Response**:

```json
["O West", "New Giza", "Il Bosco", "City Gate", "Villette"]
```

### Create Apartment

```http
POST /api/v1/apartments
Content-Type: application/json

{
  "unitNumber": "A-101",
  "name": "Luxury Garden Apartment",
  "project": "O West",
  "description": "Beautiful apartment...",
  "price": 4500000,
  "bedrooms": 3,
  "bathrooms": 2,
  "area": 180,
  "images": ["url1", "url2"]
}
```

**Response**: Created apartment object

## Expected Responses

### ✅ Success Responses

**List Apartments (200 OK)**:

```json
{
  "data": [...],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 12,
    "totalPages": 5
  }
}
```

**Get Apartment by ID (200 OK)**:

```json
{
  "id": "uuid",
  "unitNumber": "A-101",
  "name": "Luxury Garden Apartment",
  ...
}
```

**Create Apartment (201 Created)**:

```json
{
  "id": "new-uuid",
  "unitNumber": "NEW-001",
  ...
}
```

**Get Projects (200 OK)**:

```json
["O West", "New Giza", "Il Bosco", "City Gate", "Villette"]
```

### ❌ Error Responses

**Validation Error (400 Bad Request)**:

```json
{
  "message": [
    "price must be a positive number",
    "bedrooms must not be less than 0"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

**Invalid UUID (400 Bad Request)**:

```json
{
  "message": "Validation failed (uuid is expected)",
  "error": "Bad Request",
  "statusCode": 400
}
```

**Apartment Not Found (404 Not Found)**:

```json
{
  "message": "Apartment not found",
  "error": "Not Found",
  "statusCode": 404
}
```

**Internal Server Error (500)**:

```json
{
  "message": "Internal server error",
  "statusCode": 500
}
```

## Testing Scenarios

### Scenario 1: Browsing Apartments

1. Get all projects to populate filter dropdown
2. Browse page 1 of all apartments
3. Navigate to page 2, 3, etc.
4. ✅ See paginated results with correct metadata

### Scenario 2: Searching and Filtering

1. Search for "luxury" apartments
2. Add project filter: "O West"
3. Add price range: 4M - 6M EGP
4. Add bedroom filter: 3 bedrooms
5. ✅ Results match all criteria

### Scenario 3: Viewing Details

1. List apartments
2. Copy an apartment ID
3. Get apartment by ID
4. ✅ See full apartment details with all images

### Scenario 4: Creating Apartment

1. Submit POST request with valid data
2. ✅ Receive 201 with created apartment
3. Search for new apartment
4. ✅ Find it in the list

### Scenario 5: Validation Testing

1. Try creating apartment with missing fields
2. Try creating apartment with negative price
3. Try creating apartment with invalid data types
4. Try getting apartment with invalid UUID
5. ❌ Receive appropriate 400 errors

### Scenario 6: Edge Cases

1. Search with empty string (should return all)
2. Filter with zero price/bedrooms
3. Request with page=0 (should default to 1)
4. Request with limit=1000 (should cap at max)
5. Filter by non-existent project (should return empty)
6. ✅ Handle gracefully

## Testing User Journeys

### Budget Buyer Journey

```http
GET /apartments?maxPrice=3000000
```

Looking for affordable options

### Luxury Buyer Journey

```http
GET /apartments?minPrice=7000000
```

Looking for high-end properties

### Family Buyer Journey

```http
GET /apartments?bedrooms=4&bathrooms=3
```

Looking for spacious family homes

### Investor Journey

```http
GET /apartments?project=Il Bosco&bedrooms=1
```

Looking for studio/1BR investment properties

### Location-Specific Journey

```http
GET /apartments?project=New Giza&minPrice=3000000&maxPrice=6000000
```

Looking in specific compound with budget

## Tips & Best Practices

### Organizing Tests

- **Use comments** (`###`) to separate test cases
- **Name your tests** clearly: "Get Apartment - Success Case"
- **Group related tests** together

### Debugging

- **Check response status** first (200, 400, 404, 500)
- **Review response body** for error messages
- **Verify request format** matches expected structure
- **Check backend logs** for detailed errors

### Performance Testing

- Test with different page sizes (12, 20, 50, 100)
- Test complex filters with multiple conditions
- Test search queries with varying lengths
- Monitor response times in REST Client output

### Data Management

- Use unique unit numbers when creating test apartments
- Consider cleaning up test data periodically
- Use descriptive names for test apartments (e.g., "TEST-...")

## Environment Configuration

### Creating Environment File

For different environments, create `http-client.env.json`:

```json
{
  "development": {
    "baseUrl": "http://localhost:3001/api/v1"
  },
  "staging": {
    "baseUrl": "https://staging.nawy.com/api/v1"
  },
  "production": {
    "baseUrl": "https://api.nawy.com/api/v1"
  }
}
```

Then select environment in VS Code REST Client.

## Troubleshooting

### Connection Refused

**Error**: `ECONNREFUSED`

**Solution**:

- Ensure backend is running: `npm run start:dev`
- Check if port 3001 is correct
- Verify no firewall blocking

### 404 Not Found

**Error**: Endpoint not found

**Solution**:

- Check `@baseUrl` includes `/api/v1`
- Verify endpoint path spelling
- Ensure backend routes are registered

### 400 Bad Request

**Error**: Validation failed

**Solution**:

- Check request body format (JSON syntax)
- Verify all required fields are present
- Check data types (number vs string)
- Review validation rules in DTO

### Empty Results

**Error**: Returns empty array `[]`

**Solution**:

- Verify database has data: `npm run db:seed`
- Check if filters are too restrictive
- Try removing filters one by one

### Database Errors

**Error**: 500 with database error

**Solution**:

- Ensure database is running (Docker)
- Check database connection in `.env`
- Run migrations: `npm run db:push`
- Seed data: `npm run db:seed`

## Alternative Tools

You can also use these alternatives to test the API:

- **Postman**: Import via OpenAPI/Swagger
- **Insomnia**: Similar to Postman
- **Thunder Client**: VS Code extension
- **curl**: Command-line tool
- **HTTPie**: Modern curl alternative
- **Bruno**: Open-source API client

### Example curl Command

```bash
curl -X GET "http://localhost:3001/api/v1/apartments?page=1&limit=12" \
  -H "Content-Type: application/json"
```

## Additional Resources

- **NestJS Documentation**: https://docs.nestjs.com
- **REST Client Extension**: https://marketplace.visualstudio.com/items?itemName=humao.rest-client
- **Drizzle ORM**: https://orm.drizzle.team
- **PostgreSQL**: https://www.postgresql.org/docs

## Support

If you encounter issues:

1. Check backend logs in terminal
2. Verify database connection
3. Review this README for troubleshooting
4. Check example.env for configuration

---

**Happy Testing! 🏠**
