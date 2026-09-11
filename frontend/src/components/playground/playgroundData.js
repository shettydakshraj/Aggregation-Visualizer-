// Initial database schema and records for the in-browser SQL playground

export const INITIAL_PROJECTS = [
  { id: 101, name: 'Metro Line 4 Extension', city: 'Mumbai', zone: 'West', budget: 85000000, status: 'Active', manager: 'Aarav Sharma' },
  { id: 102, name: 'Tech Park Tower A', city: 'Bengaluru', zone: 'South', budget: 42000000, status: 'Active', manager: 'Priya Nair' },
  { id: 103, name: 'Ring Road Bypass Flyover', city: 'Delhi', zone: 'North', budget: 68000000, status: 'Completed', manager: 'Vikram Singh' },
  { id: 104, name: 'Coastal Freeway Bridge', city: 'Mumbai', zone: 'West', budget: 95000000, status: 'Planning', manager: 'Aarav Sharma' },
  { id: 105, name: 'Smart City Data Campus', city: 'Hyderabad', zone: 'South', budget: 53000000, status: 'Active', manager: 'Kavita Reddy' },
  { id: 106, name: 'Metro Terminal Hub', city: 'Bengaluru', zone: 'South', budget: 74000000, status: 'Active', manager: 'Priya Nair' },
  { id: 107, name: 'Riverfront Promenade', city: 'Pune', zone: 'West', budget: 31000000, status: 'Completed', manager: 'Rohan Patil' },
  { id: 108, name: 'Solar Microgrid Grid 2', city: 'Chennai', zone: 'South', budget: 38000000, status: 'Planning', manager: 'Deepak Raj' },
  { id: 109, name: 'Expressway Interchange 7', city: 'Delhi', zone: 'North', budget: 61000000, status: 'Active', manager: 'Vikram Singh' },
  { id: 110, name: 'Aerospace Logistics Hub', city: 'Hyderabad', zone: 'South', budget: 49000000, status: 'Completed', manager: 'Kavita Reddy' },
  { id: 111, name: 'Harbor Container Terminal', city: 'Chennai', zone: 'South', budget: 88000000, status: 'Active', manager: 'Deepak Raj' },
  { id: 112, name: 'BioTech Innovation Lab', city: 'Pune', zone: 'West', budget: 27000000, status: 'Planning', manager: 'Rohan Patil' }
];

export const INITIAL_MATERIALS = [
  { id: 1, project_id: 101, item: 'High-Tensile Steel TMT', category: 'Structural', quantity: 450, unit_cost: 65000, total_cost: 29250000 },
  { id: 2, project_id: 101, item: 'Ready-Mix Concrete Grade 40', category: 'Structural', quantity: 1200, unit_cost: 5800, total_cost: 6960000 },
  { id: 3, project_id: 102, item: 'Acoustic Glass Paneling', category: 'Finishing', quantity: 380, unit_cost: 14500, total_cost: 5510000 },
  { id: 4, project_id: 102, item: 'Armored Copper Cabling', category: 'Electrical', quantity: 950, unit_cost: 3200, total_cost: 3040000 },
  { id: 5, project_id: 103, item: 'Structural Steel Girders', category: 'Structural', quantity: 620, unit_cost: 68000, total_cost: 42160000 },
  { id: 6, project_id: 104, item: 'Prestressed Concrete Beams', category: 'Structural', quantity: 310, unit_cost: 45000, total_cost: 13950000 },
  { id: 7, project_id: 105, item: 'HVAC Copper Heat Sinks', category: 'Electrical', quantity: 420, unit_cost: 8500, total_cost: 3570000 },
  { id: 8, project_id: 106, item: 'Granite Flooring Slabs', category: 'Finishing', quantity: 800, unit_cost: 2400, total_cost: 1920000 },
  { id: 9, project_id: 107, item: 'Weather-Resistant Timber', category: 'Finishing', quantity: 500, unit_cost: 4200, total_cost: 2100000 },
  { id: 10, project_id: 109, item: 'Bitumen Asphalt Mix', category: 'Structural', quantity: 1500, unit_cost: 18000, total_cost: 27000000 },
  { id: 11, project_id: 111, item: 'Heavy Industrial Steel Crane Rails', category: 'Structural', quantity: 280, unit_cost: 92000, total_cost: 25760000 },
  { id: 12, project_id: 105, item: 'Fiber-Optic Network Trays', category: 'Electrical', quantity: 640, unit_cost: 4100, total_cost: 2624000 }
];

export const INITIAL_WORKFORCE = [
  { id: 1, project_id: 101, role: 'Civil Engineer', headcount: 8, daily_wage: 2500, shift: 'Day' },
  { id: 2, project_id: 101, role: 'Site Mason', headcount: 45, daily_wage: 950, shift: 'Day' },
  { id: 3, project_id: 102, role: 'Electrical Specialist', headcount: 14, daily_wage: 2200, shift: 'Day' },
  { id: 4, project_id: 102, role: 'HVAC Technician', headcount: 12, daily_wage: 1800, shift: 'Night' },
  { id: 5, project_id: 103, role: 'Heavy Crane Operator', headcount: 6, daily_wage: 3200, shift: 'Night' },
  { id: 6, project_id: 104, role: 'Safety Inspector', headcount: 4, daily_wage: 3500, shift: 'Day' },
  { id: 7, project_id: 105, role: 'Network Cable Tech', headcount: 16, daily_wage: 1900, shift: 'Day' },
  { id: 8, project_id: 106, role: 'Structural Welder', headcount: 22, daily_wage: 1600, shift: 'Night' },
  { id: 9, project_id: 109, role: 'Asphalt Roller Operator', headcount: 10, daily_wage: 1750, shift: 'Night' },
  { id: 10, project_id: 111, role: 'Marine Dock Rigger', headcount: 18, daily_wage: 2100, shift: 'Day' }
];

export const SCHEMA_DEFINITIONS = [
  {
    table: 'projects',
    description: 'Infrastructure and building developments across Indian metropolitan zones',
    columns: [
      { name: 'id', type: 'INT', isPk: true, desc: 'Unique project ID' },
      { name: 'name', type: 'VARCHAR(60)', isPk: false, desc: 'Project title' },
      { name: 'city', type: 'VARCHAR(30)', isPk: false, desc: 'Indian city (Mumbai, Bengaluru, Delhi, etc.)' },
      { name: 'zone', type: 'VARCHAR(20)', isPk: false, desc: 'Geographic zone (West, South, North)' },
      { name: 'budget', type: 'BIGINT', isPk: false, desc: 'Approved budget in Indian Rupees (₹)' },
      { name: 'status', type: 'VARCHAR(20)', isPk: false, desc: 'Active, Completed, Planning' },
      { name: 'manager', type: 'VARCHAR(40)', isPk: false, desc: 'Lead project supervisor' }
    ]
  },
  {
    table: 'materials',
    description: 'Procured raw construction materials and structural inventory',
    columns: [
      { name: 'id', type: 'INT', isPk: true, desc: 'Inventory record ID' },
      { name: 'project_id', type: 'INT', isFk: true, ref: 'projects.id', desc: 'Associated project' },
      { name: 'item', type: 'VARCHAR(60)', isPk: false, desc: 'Material product name' },
      { name: 'category', type: 'VARCHAR(30)', isPk: false, desc: 'Structural, Finishing, Electrical' },
      { name: 'quantity', type: 'INT', isPk: false, desc: 'Metric units or count' },
      { name: 'unit_cost', type: 'INT', isPk: false, desc: 'Price per unit in ₹' },
      { name: 'total_cost', type: 'BIGINT', isPk: false, desc: 'Calculated line total in ₹' }
    ]
  },
  {
    table: 'workforce',
    description: 'On-site engineering, labor, and machinery operational crews',
    columns: [
      { name: 'id', type: 'INT', isPk: true, desc: 'Allocation record ID' },
      { name: 'project_id', type: 'INT', isFk: true, ref: 'projects.id', desc: 'Associated project' },
      { name: 'role', type: 'VARCHAR(40)', isPk: false, desc: 'Job designation' },
      { name: 'headcount', type: 'INT', isPk: false, desc: 'Number of active crew members' },
      { name: 'daily_wage', type: 'INT', isPk: false, desc: 'Daily per-person wage in ₹' },
      { name: 'shift', type: 'VARCHAR(15)', isPk: false, desc: 'Day or Night shift' }
    ]
  }
];

export const QUERY_TEMPLATES = [
  {
    id: 'grp-city-status',
    title: 'GROUP BY: City & Status',
    category: 'GROUP BY',
    badge: 'Standard',
    sql: `-- Group projects by City and Status
-- Calculates project count, total budget and average budget
SELECT 
    city,
    status,
    COUNT(*) AS project_count,
    SUM(budget) AS total_budget_inr,
    ROUND(AVG(budget)) AS avg_budget_inr
FROM projects
GROUP BY city, status
ORDER BY city ASC, total_budget_inr DESC;`
  },
  {
    id: 'rollup-zone-city',
    title: 'ROLLUP: Zone & City Ladder',
    category: 'ROLLUP',
    badge: 'Subtotals',
    sql: `-- Hierarchical rollup: Grand Total -> Zone Subtotal -> City Total
SELECT 
    COALESCE(zone, '--- ALL ZONES (GRAND TOTAL) ---') AS zone_tier,
    COALESCE(city, '--- Zone Subtotal ---') AS city_tier,
    COUNT(*) AS total_projects,
    SUM(budget) AS total_investment_inr
FROM projects
GROUP BY ROLLUP(zone, city);`
  },
  {
    id: 'cube-status-cat',
    title: 'CUBE: Multidimensional Matrix',
    category: 'CUBE',
    badge: 'Combinatorial',
    sql: `-- Cross-tabulate all combinations of Status and Material Category
SELECT 
    COALESCE(p.status, 'ALL STATUSES') AS project_status,
    COALESCE(m.category, 'ALL CATEGORIES') AS material_category,
    COUNT(m.id) AS material_orders,
    SUM(m.total_cost) AS total_spent_inr
FROM projects p
JOIN materials m ON p.id = m.project_id
GROUP BY CUBE(p.status, m.category)
ORDER BY project_status, material_category;`
  },
  {
    id: 'having-filter',
    title: 'HAVING: High Investment Cities',
    category: 'HAVING',
    badge: 'Filtered',
    sql: `-- Filter grouped results using HAVING clause
-- Only include cities whose cumulative investment exceeds ₹60,000,000
SELECT 
    city,
    COUNT(*) AS active_projects,
    SUM(budget) AS cumulative_budget_inr,
    MAX(budget) AS largest_single_project_inr
FROM projects
GROUP BY city
HAVING SUM(budget) >= 60000000
ORDER BY cumulative_budget_inr DESC;`
  },
  {
    id: 'join-workforce',
    title: 'JOIN: Daily Wage Expenditure',
    category: 'JOIN + AGG',
    badge: 'Multi-Table',
    sql: `-- Join Projects with Workforce to compute daily payroll per Zone & Shift
SELECT 
    p.zone,
    w.shift,
    SUM(w.headcount) AS total_workers,
    SUM(w.headcount * w.daily_wage) AS total_daily_payroll_inr,
    ROUND(AVG(w.daily_wage)) AS avg_daily_wage_inr
FROM projects p
JOIN workforce w ON p.id = w.project_id
GROUP BY p.zone, w.shift
ORDER BY p.zone, total_daily_payroll_inr DESC;`
  },
  {
    id: 'case-when-agg',
    title: 'CONDITIONAL: Tiered Budget Stats',
    category: 'CASE + AGG',
    badge: 'Advanced',
    sql: `-- Aggregate project counts dynamically into Mega, Major, and Minor tiers
SELECT 
    zone,
    COUNT(*) AS total_projects,
    SUM(CASE WHEN budget >= 70000000 THEN 1 ELSE 0 END) AS mega_projects,
    SUM(CASE WHEN budget BETWEEN 40000000 AND 69999999 THEN 1 ELSE 0 END) AS major_projects,
    SUM(CASE WHEN budget < 40000000 THEN 1 ELSE 0 END) AS mid_tier_projects,
    SUM(budget) AS total_zone_budget_inr
FROM projects
GROUP BY zone
ORDER BY total_zone_budget_inr DESC;`
  }
];
