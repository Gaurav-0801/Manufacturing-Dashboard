# Manufacturing Supply Chain Management (SCM) System

A comprehensive web application designed for manufacturing companies to manage their supply chain operations efficiently. Built with Next.js, TypeScript, Prisma, and modern UI components with a professional industrial design theme.

## 🏭 Features

### Core Functionality

#### 1. **Dashboard & KPIs**
- Real-time performance metrics and key performance indicators
- Interactive charts showing cost savings, delivery performance, and quality scores
- Live data updates every 30 seconds with industrial-themed design
- Comprehensive overview of all supply chain operations
- Dynamic KPI calculations based on actual database data

#### 2. **Supplier Management**
- Complete supplier database with performance tracking
- Supplier performance scoring (0-100) based on delivery and quality metrics
- Cost savings tracking per supplier with automatic calculations
- Quality rating system (1-5 stars)
- Supplier status management (Active, Inactive, Suspended, Pending Approval)
- Advanced search and filtering capabilities
- Full CRUD operations with real-time updates

#### 3. **Shipment Tracking**
- Real-time shipment status monitoring (Pending, In Transit, Delivered, Delayed, Cancelled)
- Progress tracking with visual indicators and status badges
- Delivery performance analytics with automatic supplier score updates
- Late delivery alerts with cost impact calculations
- Integration with supplier metrics for comprehensive tracking
- Tracking number management and shipment details

#### 4. **Inventory Management**
- Stock level monitoring with automated low-stock alerts
- Inventory value calculations and real-time tracking
- Category-based organization with supplier relationships
- Location tracking across multiple warehouses
- Stock adjustment workflows with audit trails and reason tracking
- Automatic alert generation for critical stock levels
- Min/max stock level management

#### 5. **Alert & Notification System**
- Centralized alert management with severity levels (Critical, High, Medium, Low)
- Automated alerts for:
  - Low stock situations (with percentage thresholds)
  - Out of stock conditions
  - Shipment delays (with days late calculation)
  - Supplier performance issues
  - Quality concerns
  - Cost variances
- Bulk alert management and resolution tracking
- Advanced filtering by type, severity, and status
- Real-time alert count updates in navigation

#### 6. **Performance Analytics**
- Comprehensive performance dashboards with weighted scoring
- Real-time analytics calculations from live database data
- Cost analysis with category breakdowns and trend tracking
- Supplier risk assessment and performance rankings
- Inventory turnover analysis and value tracking
- Data-driven insights for decision making
- Overall performance scoring with configurable weights

### Technical Features

#### Database & Backend
- **Prisma ORM** with SQLite database (easily configurable for PostgreSQL/MySQL)
- Comprehensive data models for suppliers, shipments, inventory, alerts, and KPIs
- RESTful API endpoints for all CRUD operations
- Automated data relationships and integrity constraints
- Real-time data synchronization across all modules
- Automatic KPI updates when data changes
- Transaction-safe operations for data consistency

#### Frontend & UI
- **Industrial Design Theme** with steel grays (#64748B), warning oranges (#F97316), and success greens (#10B981)
- Responsive design optimized for desktop and tablet use
- Interactive charts and visualizations using Recharts
- Modern component library with shadcn/ui
- Advanced filtering, searching, and sorting capabilities
- Modal dialogs for detailed data entry and editing
- Loading states and error handling throughout
- Real-time data updates with automatic refresh intervals

#### Data Integration
- Automatic KPI calculations and updates based on real data
- Cross-module data synchronization (supplier performance affects overall metrics)
- Cost savings calculations based on on-time delivery performance
- Automated alert generation based on configurable business rules
- Historical data tracking for trend analysis
- Performance score calculations with weighted algorithms

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone and Install**
\`\`\`bash
git clone <repository-url>
cd manufacturing-scm
npm install
\`\`\`

2. **Environment Setup**
Create a `.env` file in the root directory:
\`\`\`env
# Database
DATABASE_URL="file:./dev.db"

# Next.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Application Settings
NODE_ENV="development"
\`\`\`

3. **Database Setup**
\`\`\`bash
# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Seed with sample data
npm run seed
\`\`\`

4. **Start Development Server**
\`\`\`bash
npm run dev
\`\`\`

5. **Access the Application**
Open [http://localhost:3000](http://localhost:3000) in your browser

## 📊 Business Value & ROI

### Cost Savings Tracking
- **Automatic Cost Calculations**: 2% savings credited for on-time deliveries
- **Supplier Cost Optimization**: Track and compare supplier costs and performance
- **Inventory Cost Management**: Monitor carrying costs and optimize stock levels
- **Late Delivery Impact**: Calculate cost impact of delayed shipments (5% penalty)

### Performance Optimization
- **Real-time Supplier Scoring**: Weighted performance metrics (delivery 30%, quality 25%, cost 25%, inventory 20%)
- **Delivery Performance Tracking**: Automatic on-time delivery rate calculations
- **Quality Score Management**: 1-5 star rating system with trend analysis
- **Inventory Turnover Optimization**: Track stock movement and identify slow-moving items

### Risk Management
- **Automated Alert System**: Intelligent alerts based on configurable thresholds
- **Supplier Risk Assessment**: Performance-based risk scoring and monitoring
- **Proactive Issue Identification**: Early warning system for supply chain disruptions
- **Historical Pattern Analysis**: Trend data for predictive risk management

### Decision Support
- **Comprehensive Analytics**: Real-time dashboards with actionable insights
- **Trend Analysis**: Historical data visualization for strategic planning
- **Data-driven Supplier Selection**: Performance metrics for vendor evaluation
- **Performance Benchmarking**: Target vs. actual performance tracking

## 🏗️ Architecture & Data Flow

### Frontend Stack
- **Next.js 14** - React framework with App Router and server components
- **TypeScript** - End-to-end type safety
- **Tailwind CSS v4** - Utility-first styling with custom industrial theme tokens
- **shadcn/ui** - Modern, accessible component library
- **Recharts** - Interactive data visualization and charts
- **Lucide React** - Consistent iconography system

### Backend Stack
- **Prisma** - Type-safe database ORM with automatic migrations
- **SQLite** - Development database (production-ready for PostgreSQL/MySQL)
- **Next.js API Routes** - Serverless API endpoints with automatic optimization
- **TypeScript** - Server-side type safety and validation

### Database Schema & Relationships
- **Suppliers** → **Shipments** (One-to-Many): Track all shipments per supplier
- **Suppliers** → **Inventory Items** (One-to-Many): Supplier-specific inventory
- **Suppliers** → **Alerts** (One-to-Many): Supplier-related notifications
- **Shipments** → **Alerts** (One-to-Many): Shipment-specific alerts
- **Inventory Items** → **Alerts** (One-to-Many): Stock-level alerts
- **KPIs**: Historical performance data with categories and targets

### Business Logic & Calculations

#### Supplier Performance Score
\`\`\`typescript
performanceScore = (onTimeDeliveries / totalDeliveries) * 100
\`\`\`

#### Overall Performance Calculation
\`\`\`typescript
overallPerformance = 
  deliveryScore * 0.30 +     // On-time delivery weight
  qualityScore * 0.25 +      // Quality rating weight  
  costScore * 0.25 +         // Cost savings weight
  inventoryScore * 0.20      // Inventory management weight
\`\`\`

#### Cost Savings Logic
- **On-time Delivery Bonus**: 2% of shipment value
- **Late Delivery Penalty**: 5% cost impact calculation
- **Cumulative Tracking**: Running total per supplier

## 🔧 Configuration & Customization

### Alert Thresholds
- **Low Stock**: When `currentStock <= minStockLevel`
- **Critical Stock**: When `currentStock < 25% of minStockLevel`
- **Out of Stock**: When `currentStock = 0`
- **Late Delivery**: When `actualDate > expectedDate`

### Performance Targets
- **On-Time Delivery**: 95% target
- **Quality Rating**: 4.5/5 target
- **Cost Savings**: $300,000 annual target
- **Supplier Count**: 50 active suppliers target

### Customization Options
- **Color Themes**: Modify industrial color tokens in `app/globals.css`
- **Business Rules**: Update calculation logic in API routes
- **Alert Sensitivity**: Adjust threshold percentages
- **KPI Weights**: Modify performance calculation weights
- **Data Models**: Extend Prisma schema for additional fields

## 📈 Key Metrics & KPIs

### Primary KPIs
1. **Total Cost Savings** ($): Cumulative savings from supplier optimizations
2. **On-Time Delivery Rate** (%): Percentage of shipments delivered on schedule
3. **Inventory Value** ($): Total value of current stock across all items
4. **Active Suppliers** (#): Count of suppliers with active status

### Secondary Metrics
- **Supplier Performance Score** (0-100): Weighted performance average
- **Quality Rating** (1-5): Average quality score across suppliers
- **Low Stock Items** (#): Count of items below minimum threshold
- **Critical Alerts** (#): Count of unresolved critical issues
- **Average Resolution Time**: Time to resolve supply chain issues

### Analytics Insights
- **Performance Trends**: Month-over-month performance changes
- **Cost Analysis**: Category-wise cost breakdown and trends
- **Supplier Rankings**: Performance-based supplier comparisons
- **Inventory Analytics**: Stock level optimization recommendations

## 🛠️ Development & Maintenance

### Database Management
\`\`\`bash
# View database in Prisma Studio
npx prisma studio

# Reset database with fresh schema
npx prisma migrate reset

# Generate new migration
npx prisma migrate dev --name <migration-name>

# Seed database with sample data
npm run seed
\`\`\`

### API Endpoints
- `GET/POST /api/suppliers` - Supplier management
- `GET/POST /api/shipments` - Shipment tracking
- `GET/POST /api/inventory` - Inventory management
- `GET/POST /api/alerts` - Alert system
- `GET /api/kpis` - KPI calculations
- `GET /api/analytics/*` - Analytics data

### Code Quality & Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency rules
- **Prettier**: Automated code formatting
- **Component Architecture**: Modular, reusable components
- **API Design**: RESTful endpoints with consistent error handling

## 🚀 Deployment & Production

### Recommended Deployment Platforms
- **Vercel** (recommended): Seamless Next.js deployment with edge functions
- **Railway**: Full-stack deployment with managed database
- **Docker**: Containerized deployment for any cloud platform

### Production Considerations
- **Database**: Migrate from SQLite to PostgreSQL or MySQL for production
- **Environment Variables**: Secure configuration management
- **Monitoring**: Application performance and error tracking
- **Backup Strategy**: Regular database backups and disaster recovery
- **Scaling**: Horizontal scaling for high-traffic scenarios

### Performance Optimizations
- **Server Components**: Reduced client-side JavaScript
- **API Caching**: Intelligent caching for frequently accessed data
- **Database Indexing**: Optimized queries for large datasets
- **Image Optimization**: Automatic image compression and serving

## 📞 Support & Documentation

This Manufacturing SCM system provides a comprehensive, production-ready solution for supply chain management with:

- **Real-time Monitoring**: Live data updates and performance tracking
- **Automated Intelligence**: Smart alerts and performance calculations  
- **Industrial Design**: Professional interface optimized for manufacturing environments
- **Scalable Architecture**: Built for growth and enterprise requirements
- **Data-Driven Insights**: Analytics and reporting for strategic decision making

### Key Benefits
✅ **Immediate ROI**: Cost savings tracking and optimization  
✅ **Risk Reduction**: Proactive alert system and performance monitoring  
✅ **Operational Efficiency**: Streamlined workflows and automated calculations  
✅ **Strategic Insights**: Comprehensive analytics for data-driven decisions  
✅ **Scalable Solution**: Enterprise-ready architecture and design  

The system is designed to provide immediate value to manufacturing companies while scaling to meet growing operational demands. All features are fully functional with real database connectivity and automated business logic.
#
