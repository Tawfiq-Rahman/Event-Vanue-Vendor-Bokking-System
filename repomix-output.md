This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
backend/
  models/
    user.js
  routes/
    adminRoutes.js
    authRoute.js
  db.js
  event_booking_system.sql
  package.json
  server.js
frontend/
  public/
    favicon.svg
    icons.svg
  src/
    assets/
      hero.png
      react.svg
      vite.svg
    component/
      Navbar.jsx
    pages/
      AdminDashboard.jsx
      logIn.jsx
      Packages.jsx
      register.jsx
      Vendor.jsx
      VenueDashboard.jsx
    App.css
    App.jsx
    index.css
    main.jsx
  .gitignore
  .oxlintrc.json
  index.html
  package.json
  README.md
  vite.config.js
graphify-out/
  cache/
    ast/
      v0.9.61-s2/
        601aea3f594fd2fd9feaa3de8210e104c6795d6d2520b6bb8bff39108dcba606.json
        7c328b72c0da726cf66aa42c2a6b064349b449e6755cbcda2cf4a6ec024538e7.json
        f83cf85b8ce16df42e05c053c45dd4f113288d3b8df2e81c3a1746d105e27c4b.json
    stat-index.json
  .graphify_analysis.json
  .graphify_root
  graph.json
  manifest.json
README.md
```

# Files

## File: graphify-out/cache/ast/v0.9.61-s2/601aea3f594fd2fd9feaa3de8210e104c6795d6d2520b6bb8bff39108dcba606.json
```json
{"nodes": [{"id": "$graphify-root$_backend_package_json", "label": "package.json", "file_type": "code", "source_file": "backend/package.json", "source_location": "L1"}, {"id": "$graphify-root$_backend_package_name", "label": "name", "file_type": "code", "source_file": "backend/package.json", "source_location": "L2"}, {"id": "$graphify-root$_backend_package_version", "label": "version", "file_type": "code", "source_file": "backend/package.json", "source_location": "L3"}, {"id": "$graphify-root$_backend_package_description", "label": "description", "file_type": "code", "source_file": "backend/package.json", "source_location": "L4"}, {"id": "$graphify-root$_backend_package_main", "label": "main", "file_type": "code", "source_file": "backend/package.json", "source_location": "L5"}, {"id": "$graphify-root$_backend_package_scripts", "label": "scripts", "file_type": "code", "source_file": "backend/package.json", "source_location": "L6"}, {"id": "$graphify-root$_backend_package_scripts_test", "label": "test", "file_type": "code", "source_file": "backend/package.json", "source_location": "L7"}, {"id": "$graphify-root$_backend_package_keywords", "label": "keywords", "file_type": "code", "source_file": "backend/package.json", "source_location": "L9"}, {"id": "$graphify-root$_backend_package_author", "label": "author", "file_type": "code", "source_file": "backend/package.json", "source_location": "L10"}, {"id": "$graphify-root$_backend_package_license", "label": "license", "file_type": "code", "source_file": "backend/package.json", "source_location": "L11"}, {"id": "$graphify-root$_backend_package_type", "label": "type", "file_type": "code", "source_file": "backend/package.json", "source_location": "L12"}, {"id": "$graphify-root$_backend_package_dependencies", "label": "dependencies", "file_type": "code", "source_file": "backend/package.json", "source_location": "L13"}, {"id": "$graphify-root$_backend_package_dependencies_bcrypt", "label": "bcrypt", "file_type": "code", "source_file": "backend/package.json", "source_location": "L14"}, {"id": "ref_bcrypt", "label": "bcrypt", "file_type": "concept", "source_file": "backend/package.json", "source_location": "L14"}, {"id": "$graphify-root$_backend_package_dependencies_bcryptjs", "label": "bcryptjs", "file_type": "code", "source_file": "backend/package.json", "source_location": "L15"}, {"id": "ref_bcryptjs", "label": "bcryptjs", "file_type": "concept", "source_file": "backend/package.json", "source_location": "L15"}, {"id": "$graphify-root$_backend_package_dependencies_cors", "label": "cors", "file_type": "code", "source_file": "backend/package.json", "source_location": "L16"}, {"id": "ref_cors", "label": "cors", "file_type": "concept", "source_file": "backend/package.json", "source_location": "L16"}, {"id": "$graphify-root$_backend_package_dependencies_dotenv", "label": "dotenv", "file_type": "code", "source_file": "backend/package.json", "source_location": "L17"}, {"id": "ref_dotenv", "label": "dotenv", "file_type": "concept", "source_file": "backend/package.json", "source_location": "L17"}, {"id": "$graphify-root$_backend_package_dependencies_express", "label": "express", "file_type": "code", "source_file": "backend/package.json", "source_location": "L18"}, {"id": "ref_express", "label": "express", "file_type": "concept", "source_file": "backend/package.json", "source_location": "L18"}, {"id": "$graphify-root$_backend_package_dependencies_jsonwebtoken", "label": "jsonwebtoken", "file_type": "code", "source_file": "backend/package.json", "source_location": "L19"}, {"id": "ref_jsonwebtoken", "label": "jsonwebtoken", "file_type": "concept", "source_file": "backend/package.json", "source_location": "L19"}, {"id": "$graphify-root$_backend_package_dependencies_mongoose", "label": "mongoose", "file_type": "code", "source_file": "backend/package.json", "source_location": "L20"}, {"id": "ref_mongoose", "label": "mongoose", "file_type": "concept", "source_file": "backend/package.json", "source_location": "L20"}, {"id": "$graphify-root$_backend_package_dependencies_mysql2", "label": "mysql2", "file_type": "code", "source_file": "backend/package.json", "source_location": "L21"}, {"id": "ref_mysql2", "label": "mysql2", "file_type": "concept", "source_file": "backend/package.json", "source_location": "L21"}], "edges": [{"source": "$graphify-root$_backend_package_json", "target": "$graphify-root$_backend_package_name", "relation": "contains", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L2", "weight": 1.0}, {"source": "$graphify-root$_backend_package_json", "target": "$graphify-root$_backend_package_version", "relation": "contains", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L3", "weight": 1.0}, {"source": "$graphify-root$_backend_package_json", "target": "$graphify-root$_backend_package_description", "relation": "contains", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L4", "weight": 1.0}, {"source": "$graphify-root$_backend_package_json", "target": "$graphify-root$_backend_package_main", "relation": "contains", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L5", "weight": 1.0}, {"source": "$graphify-root$_backend_package_json", "target": "$graphify-root$_backend_package_scripts", "relation": "contains", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L6", "weight": 1.0}, {"source": "$graphify-root$_backend_package_scripts", "target": "$graphify-root$_backend_package_scripts_test", "relation": "contains", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L7", "weight": 1.0}, {"source": "$graphify-root$_backend_package_json", "target": "$graphify-root$_backend_package_keywords", "relation": "contains", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L9", "weight": 1.0}, {"source": "$graphify-root$_backend_package_json", "target": "$graphify-root$_backend_package_author", "relation": "contains", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L10", "weight": 1.0}, {"source": "$graphify-root$_backend_package_json", "target": "$graphify-root$_backend_package_license", "relation": "contains", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L11", "weight": 1.0}, {"source": "$graphify-root$_backend_package_json", "target": "$graphify-root$_backend_package_type", "relation": "contains", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L12", "weight": 1.0}, {"source": "$graphify-root$_backend_package_json", "target": "$graphify-root$_backend_package_dependencies", "relation": "contains", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L13", "weight": 1.0}, {"source": "$graphify-root$_backend_package_dependencies", "target": "$graphify-root$_backend_package_dependencies_bcrypt", "relation": "contains", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L14", "weight": 1.0}, {"source": "$graphify-root$_backend_package_json", "target": "ref_bcrypt", "relation": "imports", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L14", "weight": 1.0, "context": "import"}, {"source": "$graphify-root$_backend_package_dependencies", "target": "$graphify-root$_backend_package_dependencies_bcryptjs", "relation": "contains", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L15", "weight": 1.0}, {"source": "$graphify-root$_backend_package_json", "target": "ref_bcryptjs", "relation": "imports", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L15", "weight": 1.0, "context": "import"}, {"source": "$graphify-root$_backend_package_dependencies", "target": "$graphify-root$_backend_package_dependencies_cors", "relation": "contains", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L16", "weight": 1.0}, {"source": "$graphify-root$_backend_package_json", "target": "ref_cors", "relation": "imports", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L16", "weight": 1.0, "context": "import"}, {"source": "$graphify-root$_backend_package_dependencies", "target": "$graphify-root$_backend_package_dependencies_dotenv", "relation": "contains", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L17", "weight": 1.0}, {"source": "$graphify-root$_backend_package_json", "target": "ref_dotenv", "relation": "imports", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L17", "weight": 1.0, "context": "import"}, {"source": "$graphify-root$_backend_package_dependencies", "target": "$graphify-root$_backend_package_dependencies_express", "relation": "contains", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L18", "weight": 1.0}, {"source": "$graphify-root$_backend_package_json", "target": "ref_express", "relation": "imports", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L18", "weight": 1.0, "context": "import"}, {"source": "$graphify-root$_backend_package_dependencies", "target": "$graphify-root$_backend_package_dependencies_jsonwebtoken", "relation": "contains", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L19", "weight": 1.0}, {"source": "$graphify-root$_backend_package_json", "target": "ref_jsonwebtoken", "relation": "imports", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L19", "weight": 1.0, "context": "import"}, {"source": "$graphify-root$_backend_package_dependencies", "target": "$graphify-root$_backend_package_dependencies_mongoose", "relation": "contains", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L20", "weight": 1.0}, {"source": "$graphify-root$_backend_package_json", "target": "ref_mongoose", "relation": "imports", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L20", "weight": 1.0, "context": "import"}, {"source": "$graphify-root$_backend_package_dependencies", "target": "$graphify-root$_backend_package_dependencies_mysql2", "relation": "contains", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L21", "weight": 1.0}, {"source": "$graphify-root$_backend_package_json", "target": "ref_mysql2", "relation": "imports", "confidence": "EXTRACTED", "source_file": "backend/package.json", "source_location": "L21", "weight": 1.0, "context": "import"}]}
```

## File: graphify-out/cache/ast/v0.9.61-s2/7c328b72c0da726cf66aa42c2a6b064349b449e6755cbcda2cf4a6ec024538e7.json
```json
{"nodes": [{"id": "$graphify-root$_frontend_oxlintrc_json", "label": ".oxlintrc.json", "file_type": "code", "source_file": "frontend/.oxlintrc.json", "source_location": "L1"}, {"id": "$graphify-root$_frontend_oxlintrc_schema", "label": "$schema", "file_type": "code", "source_file": "frontend/.oxlintrc.json", "source_location": "L2"}, {"id": "$graphify-root$_frontend_oxlintrc_plugins", "label": "plugins", "file_type": "code", "source_file": "frontend/.oxlintrc.json", "source_location": "L3"}, {"id": "$graphify-root$_frontend_oxlintrc_rules", "label": "rules", "file_type": "code", "source_file": "frontend/.oxlintrc.json", "source_location": "L4"}, {"id": "$graphify-root$_frontend_oxlintrc_rules_react_rules_of_hooks", "label": "react/rules-of-hooks", "file_type": "code", "source_file": "frontend/.oxlintrc.json", "source_location": "L5"}, {"id": "$graphify-root$_frontend_oxlintrc_rules_react_only_export_components", "label": "react/only-export-components", "file_type": "code", "source_file": "frontend/.oxlintrc.json", "source_location": "L6"}], "edges": [{"source": "$graphify-root$_frontend_oxlintrc_json", "target": "$graphify-root$_frontend_oxlintrc_schema", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/.oxlintrc.json", "source_location": "L2", "weight": 1.0}, {"source": "$graphify-root$_frontend_oxlintrc_json", "target": "$graphify-root$_frontend_oxlintrc_plugins", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/.oxlintrc.json", "source_location": "L3", "weight": 1.0}, {"source": "$graphify-root$_frontend_oxlintrc_json", "target": "$graphify-root$_frontend_oxlintrc_rules", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/.oxlintrc.json", "source_location": "L4", "weight": 1.0}, {"source": "$graphify-root$_frontend_oxlintrc_rules", "target": "$graphify-root$_frontend_oxlintrc_rules_react_rules_of_hooks", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/.oxlintrc.json", "source_location": "L5", "weight": 1.0}, {"source": "$graphify-root$_frontend_oxlintrc_rules", "target": "$graphify-root$_frontend_oxlintrc_rules_react_only_export_components", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/.oxlintrc.json", "source_location": "L6", "weight": 1.0}]}
```

## File: graphify-out/cache/ast/v0.9.61-s2/f83cf85b8ce16df42e05c053c45dd4f113288d3b8df2e81c3a1746d105e27c4b.json
```json
{"nodes": [{"id": "$graphify-root$_frontend_package_json", "label": "package.json", "file_type": "code", "source_file": "frontend/package.json", "source_location": "L1"}, {"id": "$graphify-root$_frontend_package_name", "label": "name", "file_type": "code", "source_file": "frontend/package.json", "source_location": "L2"}, {"id": "$graphify-root$_frontend_package_private", "label": "private", "file_type": "code", "source_file": "frontend/package.json", "source_location": "L3"}, {"id": "$graphify-root$_frontend_package_version", "label": "version", "file_type": "code", "source_file": "frontend/package.json", "source_location": "L4"}, {"id": "$graphify-root$_frontend_package_type", "label": "type", "file_type": "code", "source_file": "frontend/package.json", "source_location": "L5"}, {"id": "$graphify-root$_frontend_package_scripts", "label": "scripts", "file_type": "code", "source_file": "frontend/package.json", "source_location": "L6"}, {"id": "$graphify-root$_frontend_package_scripts_dev", "label": "dev", "file_type": "code", "source_file": "frontend/package.json", "source_location": "L7"}, {"id": "$graphify-root$_frontend_package_scripts_build", "label": "build", "file_type": "code", "source_file": "frontend/package.json", "source_location": "L8"}, {"id": "$graphify-root$_frontend_package_scripts_lint", "label": "lint", "file_type": "code", "source_file": "frontend/package.json", "source_location": "L9"}, {"id": "$graphify-root$_frontend_package_scripts_preview", "label": "preview", "file_type": "code", "source_file": "frontend/package.json", "source_location": "L10"}, {"id": "$graphify-root$_frontend_package_dependencies", "label": "dependencies", "file_type": "code", "source_file": "frontend/package.json", "source_location": "L12"}, {"id": "$graphify-root$_frontend_package_dependencies_tailwindcss_vite", "label": "@tailwindcss/vite", "file_type": "code", "source_file": "frontend/package.json", "source_location": "L13"}, {"id": "ref_tailwindcss_vite", "label": "@tailwindcss/vite", "file_type": "concept", "source_file": "frontend/package.json", "source_location": "L13"}, {"id": "$graphify-root$_frontend_package_dependencies_lucide_react", "label": "lucide-react", "file_type": "code", "source_file": "frontend/package.json", "source_location": "L14"}, {"id": "ref_lucide_react", "label": "lucide-react", "file_type": "concept", "source_file": "frontend/package.json", "source_location": "L14"}, {"id": "$graphify-root$_frontend_package_dependencies_react", "label": "react", "file_type": "code", "source_file": "frontend/package.json", "source_location": "L15"}, {"id": "ref_react", "label": "react", "file_type": "concept", "source_file": "frontend/package.json", "source_location": "L15"}, {"id": "$graphify-root$_frontend_package_dependencies_react_dom", "label": "react-dom", "file_type": "code", "source_file": "frontend/package.json", "source_location": "L16"}, {"id": "ref_react_dom", "label": "react-dom", "file_type": "concept", "source_file": "frontend/package.json", "source_location": "L16"}, {"id": "$graphify-root$_frontend_package_dependencies_react_router_dom", "label": "react-router-dom", "file_type": "code", "source_file": "frontend/package.json", "source_location": "L17"}, {"id": "ref_react_router_dom", "label": "react-router-dom", "file_type": "concept", "source_file": "frontend/package.json", "source_location": "L17"}, {"id": "$graphify-root$_frontend_package_dependencies_tailwindcss", "label": "tailwindcss", "file_type": "code", "source_file": "frontend/package.json", "source_location": "L18"}, {"id": "ref_tailwindcss", "label": "tailwindcss", "file_type": "concept", "source_file": "frontend/package.json", "source_location": "L18"}, {"id": "$graphify-root$_frontend_package_devdependencies", "label": "devDependencies", "file_type": "code", "source_file": "frontend/package.json", "source_location": "L20"}, {"id": "$graphify-root$_frontend_package_devdependencies_types_react", "label": "@types/react", "file_type": "code", "source_file": "frontend/package.json", "source_location": "L21"}, {"id": "ref_types_react", "label": "@types/react", "file_type": "concept", "source_file": "frontend/package.json", "source_location": "L21"}, {"id": "$graphify-root$_frontend_package_devdependencies_types_react_dom", "label": "@types/react-dom", "file_type": "code", "source_file": "frontend/package.json", "source_location": "L22"}, {"id": "ref_types_react_dom", "label": "@types/react-dom", "file_type": "concept", "source_file": "frontend/package.json", "source_location": "L22"}, {"id": "$graphify-root$_frontend_package_devdependencies_vitejs_plugin_react", "label": "@vitejs/plugin-react", "file_type": "code", "source_file": "frontend/package.json", "source_location": "L23"}, {"id": "ref_vitejs_plugin_react", "label": "@vitejs/plugin-react", "file_type": "concept", "source_file": "frontend/package.json", "source_location": "L23"}, {"id": "$graphify-root$_frontend_package_devdependencies_oxlint", "label": "oxlint", "file_type": "code", "source_file": "frontend/package.json", "source_location": "L24"}, {"id": "ref_oxlint", "label": "oxlint", "file_type": "concept", "source_file": "frontend/package.json", "source_location": "L24"}, {"id": "$graphify-root$_frontend_package_devdependencies_vite", "label": "vite", "file_type": "code", "source_file": "frontend/package.json", "source_location": "L25"}, {"id": "ref_vite", "label": "vite", "file_type": "concept", "source_file": "frontend/package.json", "source_location": "L25"}], "edges": [{"source": "$graphify-root$_frontend_package_json", "target": "$graphify-root$_frontend_package_name", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L2", "weight": 1.0}, {"source": "$graphify-root$_frontend_package_json", "target": "$graphify-root$_frontend_package_private", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L3", "weight": 1.0}, {"source": "$graphify-root$_frontend_package_json", "target": "$graphify-root$_frontend_package_version", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L4", "weight": 1.0}, {"source": "$graphify-root$_frontend_package_json", "target": "$graphify-root$_frontend_package_type", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L5", "weight": 1.0}, {"source": "$graphify-root$_frontend_package_json", "target": "$graphify-root$_frontend_package_scripts", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L6", "weight": 1.0}, {"source": "$graphify-root$_frontend_package_scripts", "target": "$graphify-root$_frontend_package_scripts_dev", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L7", "weight": 1.0}, {"source": "$graphify-root$_frontend_package_scripts", "target": "$graphify-root$_frontend_package_scripts_build", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L8", "weight": 1.0}, {"source": "$graphify-root$_frontend_package_scripts", "target": "$graphify-root$_frontend_package_scripts_lint", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L9", "weight": 1.0}, {"source": "$graphify-root$_frontend_package_scripts", "target": "$graphify-root$_frontend_package_scripts_preview", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L10", "weight": 1.0}, {"source": "$graphify-root$_frontend_package_json", "target": "$graphify-root$_frontend_package_dependencies", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L12", "weight": 1.0}, {"source": "$graphify-root$_frontend_package_dependencies", "target": "$graphify-root$_frontend_package_dependencies_tailwindcss_vite", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L13", "weight": 1.0}, {"source": "$graphify-root$_frontend_package_json", "target": "ref_tailwindcss_vite", "relation": "imports", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L13", "weight": 1.0, "context": "import"}, {"source": "$graphify-root$_frontend_package_dependencies", "target": "$graphify-root$_frontend_package_dependencies_lucide_react", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L14", "weight": 1.0}, {"source": "$graphify-root$_frontend_package_json", "target": "ref_lucide_react", "relation": "imports", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L14", "weight": 1.0, "context": "import"}, {"source": "$graphify-root$_frontend_package_dependencies", "target": "$graphify-root$_frontend_package_dependencies_react", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L15", "weight": 1.0}, {"source": "$graphify-root$_frontend_package_json", "target": "ref_react", "relation": "imports", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L15", "weight": 1.0, "context": "import"}, {"source": "$graphify-root$_frontend_package_dependencies", "target": "$graphify-root$_frontend_package_dependencies_react_dom", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L16", "weight": 1.0}, {"source": "$graphify-root$_frontend_package_json", "target": "ref_react_dom", "relation": "imports", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L16", "weight": 1.0, "context": "import"}, {"source": "$graphify-root$_frontend_package_dependencies", "target": "$graphify-root$_frontend_package_dependencies_react_router_dom", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L17", "weight": 1.0}, {"source": "$graphify-root$_frontend_package_json", "target": "ref_react_router_dom", "relation": "imports", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L17", "weight": 1.0, "context": "import"}, {"source": "$graphify-root$_frontend_package_dependencies", "target": "$graphify-root$_frontend_package_dependencies_tailwindcss", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L18", "weight": 1.0}, {"source": "$graphify-root$_frontend_package_json", "target": "ref_tailwindcss", "relation": "imports", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L18", "weight": 1.0, "context": "import"}, {"source": "$graphify-root$_frontend_package_json", "target": "$graphify-root$_frontend_package_devdependencies", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L20", "weight": 1.0}, {"source": "$graphify-root$_frontend_package_devdependencies", "target": "$graphify-root$_frontend_package_devdependencies_types_react", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L21", "weight": 1.0}, {"source": "$graphify-root$_frontend_package_json", "target": "ref_types_react", "relation": "imports", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L21", "weight": 1.0, "context": "import"}, {"source": "$graphify-root$_frontend_package_devdependencies", "target": "$graphify-root$_frontend_package_devdependencies_types_react_dom", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L22", "weight": 1.0}, {"source": "$graphify-root$_frontend_package_json", "target": "ref_types_react_dom", "relation": "imports", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L22", "weight": 1.0, "context": "import"}, {"source": "$graphify-root$_frontend_package_devdependencies", "target": "$graphify-root$_frontend_package_devdependencies_vitejs_plugin_react", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L23", "weight": 1.0}, {"source": "$graphify-root$_frontend_package_json", "target": "ref_vitejs_plugin_react", "relation": "imports", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L23", "weight": 1.0, "context": "import"}, {"source": "$graphify-root$_frontend_package_devdependencies", "target": "$graphify-root$_frontend_package_devdependencies_oxlint", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L24", "weight": 1.0}, {"source": "$graphify-root$_frontend_package_json", "target": "ref_oxlint", "relation": "imports", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L24", "weight": 1.0, "context": "import"}, {"source": "$graphify-root$_frontend_package_devdependencies", "target": "$graphify-root$_frontend_package_devdependencies_vite", "relation": "contains", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L25", "weight": 1.0}, {"source": "$graphify-root$_frontend_package_json", "target": "ref_vite", "relation": "imports", "confidence": "EXTRACTED", "source_file": "frontend/package.json", "source_location": "L25", "weight": 1.0, "context": "import"}]}
```

## File: graphify-out/cache/stat-index.json
```json
{"README.md":{"size":76,"mtime_ns":1785427672100817500,"indexed_at_ns":1789392284608087500,"word_count":4,"hashes":{"readme.md":"a8a0538681156a33c8318942be9dd059b423b247e6a3312bf0d23216f66b21b4"}},"backend/db.js":{"size":394,"mtime_ns":1789052045191263100,"indexed_at_ns":1789392283915783000,"word_count":35},"backend/event_booking_system.sql":{"size":8672,"mtime_ns":1789375241762735600,"indexed_at_ns":1789392284228532800,"word_count":990,"hashes":{"backend/event_booking_system.sql":"0a67d83ea48d6e6aa9409f4fc672eca9301a82b2cc6e3e39aca599311355b699"}},"backend/models/user.js":{"size":653,"mtime_ns":1789139972741297000,"indexed_at_ns":1789392283924460600,"word_count":74},"backend/package.json":{"size":471,"mtime_ns":1789140272916929200,"indexed_at_ns":1789392284230310300,"word_count":49,"hashes":{"backend/package.json":"601aea3f594fd2fd9feaa3de8210e104c6795d6d2520b6bb8bff39108dcba606"}},"backend/routes/adminRoutes.js":{"size":2279,"mtime_ns":1789141990943086700,"indexed_at_ns":1789392283937490800,"word_count":265},"backend/routes/authRoute.js":{"size":4074,"mtime_ns":1789145385970272700,"indexed_at_ns":1789392283938436100,"word_count":487},"backend/server.js":{"size":984,"mtime_ns":1789141982581413500,"indexed_at_ns":1789392283939367800,"word_count":114},"frontend/.oxlintrc.json":{"size":231,"mtime_ns":1789050620108891900,"indexed_at_ns":1789392284231294600,"word_count":18,"hashes":{"frontend/.oxlintrc.json":"7c328b72c0da726cf66aa42c2a6b064349b449e6755cbcda2cf4a6ec024538e7"}},"frontend/README.md":{"size":1009,"mtime_ns":1789050620106891500,"indexed_at_ns":1789392284608721400,"word_count":104,"hashes":{"frontend/readme.md":"9d54429acfdfa29e976abc4c0c4d3715e9924731134d363c00dc8474fa6705c8"}},"frontend/index.html":{"size":360,"mtime_ns":1789050636022799100,"indexed_at_ns":1789392284609323700,"word_count":28,"hashes":{"frontend/index.html":"6ed8b2edea12b50cee613ae6177715b71f34bb4ae701bd2ca1c53954a113a13e"}},"frontend/package.json":{"size":589,"mtime_ns":1789051421076659300,"indexed_at_ns":1789392284232273800,"word_count":51,"hashes":{"frontend/package.json":"f83cf85b8ce16df42e05c053c45dd4f113288d3b8df2e81c3a1746d105e27c4b"}},"frontend/public/favicon.svg":{"size":9522,"mtime_ns":1789050620112255800,"indexed_at_ns":1789392284609898100,"word_count":491,"hashes":{"frontend/public/favicon.svg":"410cbb491fe3304a60e659905a41f7d7f668f64c30bde27ad287399153135b04"}},"frontend/public/icons.svg":{"size":5031,"mtime_ns":1789050620114340700,"indexed_at_ns":1789392284610491800,"word_count":382,"hashes":{"frontend/public/icons.svg":"2b02e12a4a45fccb05de8b856fee6ab8f9adfc2d6388bddfc18a9c238801a2af"}},"frontend/src/App.jsx":{"size":9459,"mtime_ns":1789146824714805700,"indexed_at_ns":1789392283982767400,"word_count":792},"frontend/src/assets/hero.png":{"size":13057,"mtime_ns":1789050620119347900,"indexed_at_ns":1789392284611087200,"word_count":437,"hashes":{"frontend/src/assets/hero.png":"27ac613c619afb7eb19b352e1fc1698c731437096e109eebe7315e18fc646d9b"}},"frontend/src/assets/react.svg":{"size":4126,"mtime_ns":1789050620120348700,"indexed_at_ns":1789392284611688100,"word_count":366,"hashes":{"frontend/src/assets/react.svg":"d3790381ae5bac1361b684d790590390ded46432b2efda957c4531f96a64791f"}},"frontend/src/assets/vite.svg":{"size":8709,"mtime_ns":1789050620123365900,"indexed_at_ns":1789392284612267900,"word_count":439,"hashes":{"frontend/src/assets/vite.svg":"b91f8b511ba45c1e9a6de88c492c1c2b4934cbfc888605466027d3532855ced2"}},"frontend/src/component/Navbar.jsx":{"size":3651,"mtime_ns":1789157387556083200,"indexed_at_ns":1789392284013883400,"word_count":276},"frontend/src/main.jsx":{"size":229,"mtime_ns":1789050620125349400,"indexed_at_ns":1789392284025403100,"word_count":24},"frontend/src/pages/AdminDashboard.jsx":{"size":12446,"mtime_ns":1789163118504536300,"indexed_at_ns":1789392284032166100,"word_count":984},"frontend/src/pages/Packages.jsx":{"size":4625,"mtime_ns":1789072214226105900,"indexed_at_ns":1789392284045668900,"word_count":368},"frontend/src/pages/Vendor.jsx":{"size":7332,"mtime_ns":1789073382175666000,"indexed_at_ns":1789392284056212500,"word_count":590},"frontend/src/pages/VenueDashboard.jsx":{"size":9574,"mtime_ns":1789159390719809500,"indexed_at_ns":1789392284068615400,"word_count":750},"frontend/src/pages/logIn.jsx":{"size":6650,"mtime_ns":1789140310951021200,"indexed_at_ns":1789392284079180300,"word_count":537},"frontend/src/pages/register.jsx":{"size":7199,"mtime_ns":1789073997328347200,"indexed_at_ns":1789392284091987500,"word_count":581},"frontend/vite.config.js":{"size":204,"mtime_ns":1789050974732900500,"indexed_at_ns":1789392284103462300,"word_count":23}}
```

## File: graphify-out/.graphify_analysis.json
```json
{
  "communities": {
    "0": [
      "backend_db",
      "backend_db_mysql",
      "backend_db_pool",
      "backend_routes_adminroutes",
      "backend_routes_adminroutes_db",
      "backend_routes_adminroutes_express",
      "backend_routes_adminroutes_router",
      "backend_routes_authroute",
      "backend_routes_authroute_bcrypt",
      "backend_routes_authroute_db",
      "backend_routes_authroute_express",
      "backend_routes_authroute_jwt",
      "backend_routes_authroute_router",
      "backend_server",
      "backend_server_adminroutes",
      "backend_server_app",
      "backend_server_authroutes",
      "backend_server_cors",
      "backend_server_db",
      "backend_server_express",
      "ref_bcryptjs",
      "ref_cors",
      "ref_express",
      "ref_jsonwebtoken"
    ],
    "1": [
      "frontend_src_app",
      "frontend_src_app_app",
      "frontend_src_app_home",
      "frontend_src_app_layout",
      "frontend_src_component_navbar",
      "frontend_src_component_navbar_navbar",
      "frontend_src_main",
      "frontend_src_pages_admindashboard",
      "frontend_src_pages_admindashboard_admindashboard",
      "frontend_src_pages_login",
      "frontend_src_pages_login_login",
      "frontend_src_pages_packages",
      "frontend_src_pages_packages_packages",
      "frontend_src_pages_register",
      "frontend_src_pages_register_register",
      "frontend_src_pages_vendor",
      "frontend_src_pages_vendor_vendor",
      "frontend_src_pages_venuedashboard",
      "frontend_src_pages_venuedashboard_venuedashboard",
      "ref_lucide_react",
      "ref_react",
      "ref_react_router_dom"
    ],
    "2": [
      "backend_models_user",
      "backend_models_user_mongoose",
      "backend_models_user_userschema",
      "backend_package",
      "backend_package_author",
      "backend_package_description",
      "backend_package_keywords",
      "backend_package_license",
      "backend_package_main",
      "backend_package_name",
      "backend_package_scripts",
      "backend_package_scripts_test",
      "backend_package_type",
      "backend_package_version",
      "ref_bcrypt",
      "ref_dotenv",
      "ref_mongoose",
      "ref_mysql2"
    ],
    "3": [
      "frontend_package",
      "frontend_package_name",
      "frontend_package_private",
      "frontend_package_type",
      "frontend_package_version",
      "frontend_vite_config",
      "ref_oxlint",
      "ref_react_dom",
      "ref_tailwindcss",
      "ref_tailwindcss_vite",
      "ref_types_react",
      "ref_types_react_dom",
      "ref_vite",
      "ref_vitejs_plugin_react"
    ],
    "4": [
      "backend_package_dependencies",
      "backend_package_dependencies_bcrypt",
      "backend_package_dependencies_bcryptjs",
      "backend_package_dependencies_cors",
      "backend_package_dependencies_dotenv",
      "backend_package_dependencies_express",
      "backend_package_dependencies_jsonwebtoken",
      "backend_package_dependencies_mongoose",
      "backend_package_dependencies_mysql2"
    ],
    "5": [
      "frontend_package_dependencies",
      "frontend_package_dependencies_lucide_react",
      "frontend_package_dependencies_react",
      "frontend_package_dependencies_react_dom",
      "frontend_package_dependencies_react_router_dom",
      "frontend_package_dependencies_tailwindcss",
      "frontend_package_dependencies_tailwindcss_vite"
    ],
    "6": [
      "frontend_oxlintrc",
      "frontend_oxlintrc_plugins",
      "frontend_oxlintrc_rules",
      "frontend_oxlintrc_rules_react_only_export_components",
      "frontend_oxlintrc_rules_react_rules_of_hooks",
      "frontend_oxlintrc_schema"
    ],
    "7": [
      "frontend_package_devdependencies",
      "frontend_package_devdependencies_oxlint",
      "frontend_package_devdependencies_types_react",
      "frontend_package_devdependencies_types_react_dom",
      "frontend_package_devdependencies_vite",
      "frontend_package_devdependencies_vitejs_plugin_react"
    ],
    "8": [
      "frontend_package_scripts",
      "frontend_package_scripts_build",
      "frontend_package_scripts_dev",
      "frontend_package_scripts_lint",
      "frontend_package_scripts_preview"
    ]
  },
  "cohesion": {
    "0": 0.09782608695652174,
    "1": 0.19913419913419914,
    "2": 0.1111111111111111,
    "3": 0.16483516483516483,
    "4": 0.2222222222222222,
    "5": 0.2857142857142857,
    "6": 0.3333333333333333,
    "7": 0.3333333333333333,
    "8": 0.4
  },
  "gods": [
    {
      "id": "ref_lucide_react",
      "label": "lucide-react",
      "degree": 9
    },
    {
      "id": "ref_react",
      "label": "react",
      "degree": 7
    },
    {
      "id": "ref_react_router_dom",
      "label": "react-router-dom",
      "degree": 7
    },
    {
      "id": "frontend_package_scripts",
      "label": "scripts",
      "degree": 5
    },
    {
      "id": "ref_express",
      "label": "express",
      "degree": 4
    },
    {
      "id": "frontend_oxlintrc_rules",
      "label": "rules",
      "degree": 3
    },
    {
      "id": "backend_package_scripts",
      "label": "scripts",
      "degree": 2
    },
    {
      "id": "ref_bcryptjs",
      "label": "bcryptjs",
      "degree": 2
    },
    {
      "id": "ref_cors",
      "label": "cors",
      "degree": 2
    },
    {
      "id": "ref_jsonwebtoken",
      "label": "jsonwebtoken",
      "degree": 2
    }
  ],
  "surprises": [],
  "tokens": {
    "input": 0,
    "output": 0
  }
}
```

## File: graphify-out/.graphify_root
```
C:\Users\USER\Event-Booking-System\Tawfiq\event-booking-system
```

## File: graphify-out/graph.json
```json
{
  "directed": false,
  "multigraph": false,
  "graph": {},
  "nodes": [
    {
      "id": "frontend_src_app_app",
      "label": "App()",
      "_callable": true,
      "_origin": "ast",
      "community": 1,
      "file_type": "code",
      "norm_label": "app()",
      "source_file": "frontend/src/App.jsx",
      "source_location": "L163"
    },
    {
      "id": "frontend_src_app_home",
      "label": "Home()",
      "_callable": true,
      "_origin": "ast",
      "community": 1,
      "file_type": "code",
      "norm_label": "home()",
      "source_file": "frontend/src/App.jsx",
      "source_location": "L11"
    },
    {
      "id": "frontend_src_app_layout",
      "label": "Layout()",
      "_callable": true,
      "_origin": "ast",
      "community": 1,
      "file_type": "code",
      "norm_label": "layout()",
      "source_file": "frontend/src/App.jsx",
      "source_location": "L138"
    },
    {
      "id": "frontend_src_component_navbar_navbar",
      "label": "Navbar()",
      "_callable": true,
      "_origin": "ast",
      "community": 1,
      "file_type": "code",
      "norm_label": "navbar()",
      "source_file": "frontend/src/component/Navbar.jsx",
      "source_location": "L4"
    },
    {
      "id": "frontend_src_pages_admindashboard_admindashboard",
      "label": "AdminDashboard()",
      "_callable": true,
      "_origin": "ast",
      "community": 1,
      "file_type": "code",
      "norm_label": "admindashboard()",
      "source_file": "frontend/src/pages/AdminDashboard.jsx",
      "source_location": "L5"
    },
    {
      "id": "frontend_src_pages_login_login",
      "label": "Login()",
      "_callable": true,
      "_origin": "ast",
      "community": 1,
      "file_type": "code",
      "norm_label": "login()",
      "source_file": "frontend/src/pages/logIn.jsx",
      "source_location": "L5"
    },
    {
      "id": "frontend_src_pages_packages_packages",
      "label": "Packages()",
      "_callable": true,
      "_origin": "ast",
      "community": 1,
      "file_type": "code",
      "norm_label": "packages()",
      "source_file": "frontend/src/pages/Packages.jsx",
      "source_location": "L3"
    },
    {
      "id": "frontend_src_pages_register_register",
      "label": "Register()",
      "_callable": true,
      "_origin": "ast",
      "community": 1,
      "file_type": "code",
      "norm_label": "register()",
      "source_file": "frontend/src/pages/register.jsx",
      "source_location": "L5"
    },
    {
      "id": "frontend_src_pages_vendor_vendor",
      "label": "Vendor()",
      "_callable": true,
      "_origin": "ast",
      "community": 1,
      "file_type": "code",
      "norm_label": "vendor()",
      "source_file": "frontend/src/pages/Vendor.jsx",
      "source_location": "L4"
    },
    {
      "id": "frontend_src_pages_venuedashboard_venuedashboard",
      "label": "VenueDashboard()",
      "_callable": true,
      "_origin": "ast",
      "community": 1,
      "file_type": "code",
      "norm_label": "venuedashboard()",
      "source_file": "frontend/src/pages/VenueDashboard.jsx",
      "source_location": "L8"
    },
    {
      "id": "backend_db",
      "label": "db.js",
      "_origin": "ast",
      "community": 0,
      "file_type": "code",
      "norm_label": "db.js",
      "source_file": "backend/db.js",
      "source_location": "L1"
    },
    {
      "id": "backend_db_mysql",
      "label": "mysql",
      "_origin": "ast",
      "community": 0,
      "file_type": "code",
      "norm_label": "mysql",
      "source_file": "backend/db.js",
      "source_location": "L1"
    },
    {
      "id": "backend_db_pool",
      "label": "pool",
      "_origin": "ast",
      "community": 0,
      "file_type": "code",
      "norm_label": "pool",
      "source_file": "backend/db.js",
      "source_location": "L4"
    },
    {
      "id": "backend_routes_adminroutes",
      "label": "adminRoutes.js",
      "_origin": "ast",
      "community": 0,
      "file_type": "code",
      "norm_label": "adminroutes.js",
      "source_file": "backend/routes/adminRoutes.js",
      "source_location": "L1"
    },
    {
      "id": "backend_routes_adminroutes_db",
      "label": "db",
      "_origin": "ast",
      "community": 0,
      "file_type": "code",
      "norm_label": "db",
      "source_file": "backend/routes/adminRoutes.js",
      "source_location": "L3"
    },
    {
      "id": "backend_routes_adminroutes_express",
      "label": "express",
      "_origin": "ast",
      "community": 0,
      "file_type": "code",
      "norm_label": "express",
      "source_file": "backend/routes/adminRoutes.js",
      "source_location": "L1"
    },
    {
      "id": "backend_routes_adminroutes_router",
      "label": "router",
      "_origin": "ast",
      "community": 0,
      "file_type": "code",
      "norm_label": "router",
      "source_file": "backend/routes/adminRoutes.js",
      "source_location": "L2"
    },
    {
      "id": "backend_routes_authroute",
      "label": "authRoute.js",
      "_origin": "ast",
      "community": 0,
      "file_type": "code",
      "norm_label": "authroute.js",
      "source_file": "backend/routes/authRoute.js",
      "source_location": "L1"
    },
    {
      "id": "backend_routes_authroute_bcrypt",
      "label": "bcrypt",
      "_origin": "ast",
      "community": 0,
      "file_type": "code",
      "norm_label": "bcrypt",
      "source_file": "backend/routes/authRoute.js",
      "source_location": "L3"
    },
    {
      "id": "backend_routes_authroute_db",
      "label": "db",
      "_origin": "ast",
      "community": 0,
      "file_type": "code",
      "norm_label": "db",
      "source_file": "backend/routes/authRoute.js",
      "source_location": "L5"
    },
    {
      "id": "backend_routes_authroute_express",
      "label": "express",
      "_origin": "ast",
      "community": 0,
      "file_type": "code",
      "norm_label": "express",
      "source_file": "backend/routes/authRoute.js",
      "source_location": "L1"
    },
    {
      "id": "backend_routes_authroute_jwt",
      "label": "jwt",
      "_origin": "ast",
      "community": 0,
      "file_type": "code",
      "norm_label": "jwt",
      "source_file": "backend/routes/authRoute.js",
      "source_location": "L4"
    },
    {
      "id": "backend_routes_authroute_router",
      "label": "router",
      "_origin": "ast",
      "community": 0,
      "file_type": "code",
      "norm_label": "router",
      "source_file": "backend/routes/authRoute.js",
      "source_location": "L2"
    },
    {
      "id": "backend_server",
      "label": "server.js",
      "_origin": "ast",
      "community": 0,
      "file_type": "code",
      "norm_label": "server.js",
      "source_file": "backend/server.js",
      "source_location": "L1"
    },
    {
      "id": "backend_server_adminroutes",
      "label": "adminRoutes",
      "_origin": "ast",
      "community": 0,
      "file_type": "code",
      "norm_label": "adminroutes",
      "source_file": "backend/server.js",
      "source_location": "L7"
    },
    {
      "id": "backend_server_app",
      "label": "app",
      "_origin": "ast",
      "community": 0,
      "file_type": "code",
      "norm_label": "app",
      "source_file": "backend/server.js",
      "source_location": "L10"
    },
    {
      "id": "backend_server_authroutes",
      "label": "authRoutes",
      "_origin": "ast",
      "community": 0,
      "file_type": "code",
      "norm_label": "authroutes",
      "source_file": "backend/server.js",
      "source_location": "L8"
    },
    {
      "id": "backend_server_cors",
      "label": "cors",
      "_origin": "ast",
      "community": 0,
      "file_type": "code",
      "norm_label": "cors",
      "source_file": "backend/server.js",
      "source_location": "L2"
    },
    {
      "id": "backend_server_db",
      "label": "db",
      "_origin": "ast",
      "community": 0,
      "file_type": "code",
      "norm_label": "db",
      "source_file": "backend/server.js",
      "source_location": "L4"
    },
    {
      "id": "backend_server_express",
      "label": "express",
      "_origin": "ast",
      "community": 0,
      "file_type": "code",
      "norm_label": "express",
      "source_file": "backend/server.js",
      "source_location": "L1"
    },
    {
      "id": "ref_bcryptjs",
      "label": "bcryptjs",
      "_origin": "ast",
      "community": 0,
      "file_type": "concept",
      "norm_label": "bcryptjs",
      "source_file": "backend/package.json",
      "source_location": "L15"
    },
    {
      "id": "ref_cors",
      "label": "cors",
      "_origin": "ast",
      "community": 0,
      "file_type": "concept",
      "norm_label": "cors",
      "source_file": "backend/package.json",
      "source_location": "L16"
    },
    {
      "id": "ref_express",
      "label": "express",
      "_origin": "ast",
      "community": 0,
      "file_type": "concept",
      "norm_label": "express",
      "source_file": "backend/package.json",
      "source_location": "L18"
    },
    {
      "id": "ref_jsonwebtoken",
      "label": "jsonwebtoken",
      "_origin": "ast",
      "community": 0,
      "file_type": "concept",
      "norm_label": "jsonwebtoken",
      "source_file": "backend/package.json",
      "source_location": "L19"
    },
    {
      "id": "frontend_src_app",
      "label": "App.jsx",
      "_origin": "ast",
      "community": 1,
      "file_type": "code",
      "norm_label": "app.jsx",
      "source_file": "frontend/src/App.jsx",
      "source_location": "L1"
    },
    {
      "id": "frontend_src_component_navbar",
      "label": "Navbar.jsx",
      "_origin": "ast",
      "community": 1,
      "file_type": "code",
      "norm_label": "navbar.jsx",
      "source_file": "frontend/src/component/Navbar.jsx",
      "source_location": "L1"
    },
    {
      "id": "frontend_src_main",
      "label": "main.jsx",
      "_origin": "ast",
      "community": 1,
      "file_type": "code",
      "norm_label": "main.jsx",
      "source_file": "frontend/src/main.jsx",
      "source_location": "L1"
    },
    {
      "id": "frontend_src_pages_admindashboard",
      "label": "AdminDashboard.jsx",
      "_origin": "ast",
      "community": 1,
      "file_type": "code",
      "norm_label": "admindashboard.jsx",
      "source_file": "frontend/src/pages/AdminDashboard.jsx",
      "source_location": "L1"
    },
    {
      "id": "frontend_src_pages_login",
      "label": "logIn.jsx",
      "_origin": "ast",
      "community": 1,
      "file_type": "code",
      "norm_label": "login.jsx",
      "source_file": "frontend/src/pages/logIn.jsx",
      "source_location": "L1"
    },
    {
      "id": "frontend_src_pages_packages",
      "label": "Packages.jsx",
      "_origin": "ast",
      "community": 1,
      "file_type": "code",
      "norm_label": "packages.jsx",
      "source_file": "frontend/src/pages/Packages.jsx",
      "source_location": "L1"
    },
    {
      "id": "frontend_src_pages_register",
      "label": "register.jsx",
      "_origin": "ast",
      "community": 1,
      "file_type": "code",
      "norm_label": "register.jsx",
      "source_file": "frontend/src/pages/register.jsx",
      "source_location": "L1"
    },
    {
      "id": "frontend_src_pages_vendor",
      "label": "Vendor.jsx",
      "_origin": "ast",
      "community": 1,
      "file_type": "code",
      "norm_label": "vendor.jsx",
      "source_file": "frontend/src/pages/Vendor.jsx",
      "source_location": "L1"
    },
    {
      "id": "frontend_src_pages_venuedashboard",
      "label": "VenueDashboard.jsx",
      "_origin": "ast",
      "community": 1,
      "file_type": "code",
      "norm_label": "venuedashboard.jsx",
      "source_file": "frontend/src/pages/VenueDashboard.jsx",
      "source_location": "L1"
    },
    {
      "id": "ref_lucide_react",
      "label": "lucide-react",
      "_origin": "ast",
      "community": 1,
      "file_type": "concept",
      "norm_label": "lucide-react",
      "source_file": "frontend/package.json",
      "source_location": "L14"
    },
    {
      "id": "ref_react",
      "label": "react",
      "_origin": "ast",
      "community": 1,
      "file_type": "concept",
      "norm_label": "react",
      "source_file": "frontend/package.json",
      "source_location": "L15"
    },
    {
      "id": "ref_react_router_dom",
      "label": "react-router-dom",
      "_origin": "ast",
      "community": 1,
      "file_type": "concept",
      "norm_label": "react-router-dom",
      "source_file": "frontend/package.json",
      "source_location": "L17"
    },
    {
      "id": "backend_models_user",
      "label": "user.js",
      "_origin": "ast",
      "community": 2,
      "file_type": "code",
      "norm_label": "user.js",
      "source_file": "backend/models/user.js",
      "source_location": "L1"
    },
    {
      "id": "backend_models_user_mongoose",
      "label": "mongoose",
      "_origin": "ast",
      "community": 2,
      "file_type": "code",
      "norm_label": "mongoose",
      "source_file": "backend/models/user.js",
      "source_location": "L1"
    },
    {
      "id": "backend_models_user_userschema",
      "label": "userSchema",
      "_origin": "ast",
      "community": 2,
      "file_type": "code",
      "norm_label": "userschema",
      "source_file": "backend/models/user.js",
      "source_location": "L3"
    },
    {
      "id": "backend_package",
      "label": "backend/package.json",
      "_origin": "ast",
      "community": 2,
      "file_type": "code",
      "norm_label": "backend/package.json",
      "source_file": "backend/package.json",
      "source_location": "L1"
    },
    {
      "id": "backend_package_author",
      "label": "author",
      "_origin": "ast",
      "community": 2,
      "file_type": "code",
      "norm_label": "author",
      "source_file": "backend/package.json",
      "source_location": "L10"
    },
    {
      "id": "backend_package_description",
      "label": "description",
      "_origin": "ast",
      "community": 2,
      "file_type": "code",
      "norm_label": "description",
      "source_file": "backend/package.json",
      "source_location": "L4"
    },
    {
      "id": "backend_package_keywords",
      "label": "keywords",
      "_origin": "ast",
      "community": 2,
      "file_type": "code",
      "norm_label": "keywords",
      "source_file": "backend/package.json",
      "source_location": "L9"
    },
    {
      "id": "backend_package_license",
      "label": "license",
      "_origin": "ast",
      "community": 2,
      "file_type": "code",
      "norm_label": "license",
      "source_file": "backend/package.json",
      "source_location": "L11"
    },
    {
      "id": "backend_package_main",
      "label": "main",
      "_origin": "ast",
      "community": 2,
      "file_type": "code",
      "norm_label": "main",
      "source_file": "backend/package.json",
      "source_location": "L5"
    },
    {
      "id": "backend_package_name",
      "label": "name",
      "_origin": "ast",
      "community": 2,
      "file_type": "code",
      "norm_label": "name",
      "source_file": "backend/package.json",
      "source_location": "L2"
    },
    {
      "id": "backend_package_scripts",
      "label": "scripts",
      "_origin": "ast",
      "community": 2,
      "file_type": "code",
      "norm_label": "scripts",
      "source_file": "backend/package.json",
      "source_location": "L6"
    },
    {
      "id": "backend_package_scripts_test",
      "label": "test",
      "_origin": "ast",
      "community": 2,
      "file_type": "code",
      "norm_label": "test",
      "source_file": "backend/package.json",
      "source_location": "L7"
    },
    {
      "id": "backend_package_type",
      "label": "type",
      "_origin": "ast",
      "community": 2,
      "file_type": "code",
      "norm_label": "type",
      "source_file": "backend/package.json",
      "source_location": "L12"
    },
    {
      "id": "backend_package_version",
      "label": "version",
      "_origin": "ast",
      "community": 2,
      "file_type": "code",
      "norm_label": "version",
      "source_file": "backend/package.json",
      "source_location": "L3"
    },
    {
      "id": "ref_bcrypt",
      "label": "bcrypt",
      "_origin": "ast",
      "community": 2,
      "file_type": "concept",
      "norm_label": "bcrypt",
      "source_file": "backend/package.json",
      "source_location": "L14"
    },
    {
      "id": "ref_dotenv",
      "label": "dotenv",
      "_origin": "ast",
      "community": 2,
      "file_type": "concept",
      "norm_label": "dotenv",
      "source_file": "backend/package.json",
      "source_location": "L17"
    },
    {
      "id": "ref_mongoose",
      "label": "mongoose",
      "_origin": "ast",
      "community": 2,
      "file_type": "concept",
      "norm_label": "mongoose",
      "source_file": "backend/package.json",
      "source_location": "L20"
    },
    {
      "id": "ref_mysql2",
      "label": "mysql2",
      "_origin": "ast",
      "community": 2,
      "file_type": "concept",
      "norm_label": "mysql2",
      "source_file": "backend/package.json",
      "source_location": "L21"
    },
    {
      "id": "frontend_package",
      "label": "frontend/package.json",
      "_origin": "ast",
      "community": 3,
      "file_type": "code",
      "norm_label": "frontend/package.json",
      "source_file": "frontend/package.json",
      "source_location": "L1"
    },
    {
      "id": "frontend_package_name",
      "label": "name",
      "_origin": "ast",
      "community": 3,
      "file_type": "code",
      "norm_label": "name",
      "source_file": "frontend/package.json",
      "source_location": "L2"
    },
    {
      "id": "frontend_package_private",
      "label": "private",
      "_origin": "ast",
      "community": 3,
      "file_type": "code",
      "norm_label": "private",
      "source_file": "frontend/package.json",
      "source_location": "L3"
    },
    {
      "id": "frontend_package_type",
      "label": "type",
      "_origin": "ast",
      "community": 3,
      "file_type": "code",
      "norm_label": "type",
      "source_file": "frontend/package.json",
      "source_location": "L5"
    },
    {
      "id": "frontend_package_version",
      "label": "version",
      "_origin": "ast",
      "community": 3,
      "file_type": "code",
      "norm_label": "version",
      "source_file": "frontend/package.json",
      "source_location": "L4"
    },
    {
      "id": "frontend_vite_config",
      "label": "vite.config.js",
      "_origin": "ast",
      "community": 3,
      "file_type": "code",
      "norm_label": "vite.config.js",
      "source_file": "frontend/vite.config.js",
      "source_location": "L1"
    },
    {
      "id": "ref_oxlint",
      "label": "oxlint",
      "_origin": "ast",
      "community": 3,
      "file_type": "concept",
      "norm_label": "oxlint",
      "source_file": "frontend/package.json",
      "source_location": "L24"
    },
    {
      "id": "ref_react_dom",
      "label": "react-dom",
      "_origin": "ast",
      "community": 3,
      "file_type": "concept",
      "norm_label": "react-dom",
      "source_file": "frontend/package.json",
      "source_location": "L16"
    },
    {
      "id": "ref_tailwindcss",
      "label": "tailwindcss",
      "_origin": "ast",
      "community": 3,
      "file_type": "concept",
      "norm_label": "tailwindcss",
      "source_file": "frontend/package.json",
      "source_location": "L18"
    },
    {
      "id": "ref_tailwindcss_vite",
      "label": "@tailwindcss/vite",
      "_origin": "ast",
      "community": 3,
      "file_type": "concept",
      "norm_label": "@tailwindcss/vite",
      "source_file": "frontend/package.json",
      "source_location": "L13"
    },
    {
      "id": "ref_types_react",
      "label": "@types/react",
      "_origin": "ast",
      "community": 3,
      "file_type": "concept",
      "norm_label": "@types/react",
      "source_file": "frontend/package.json",
      "source_location": "L21"
    },
    {
      "id": "ref_types_react_dom",
      "label": "@types/react-dom",
      "_origin": "ast",
      "community": 3,
      "file_type": "concept",
      "norm_label": "@types/react-dom",
      "source_file": "frontend/package.json",
      "source_location": "L22"
    },
    {
      "id": "ref_vite",
      "label": "vite",
      "_origin": "ast",
      "community": 3,
      "file_type": "concept",
      "norm_label": "vite",
      "source_file": "frontend/package.json",
      "source_location": "L25"
    },
    {
      "id": "ref_vitejs_plugin_react",
      "label": "@vitejs/plugin-react",
      "_origin": "ast",
      "community": 3,
      "file_type": "concept",
      "norm_label": "@vitejs/plugin-react",
      "source_file": "frontend/package.json",
      "source_location": "L23"
    },
    {
      "id": "backend_package_dependencies",
      "label": "dependencies",
      "_origin": "ast",
      "community": 4,
      "file_type": "code",
      "norm_label": "dependencies",
      "source_file": "backend/package.json",
      "source_location": "L13"
    },
    {
      "id": "backend_package_dependencies_bcrypt",
      "label": "bcrypt",
      "_origin": "ast",
      "community": 4,
      "file_type": "code",
      "norm_label": "bcrypt",
      "source_file": "backend/package.json",
      "source_location": "L14"
    },
    {
      "id": "backend_package_dependencies_bcryptjs",
      "label": "bcryptjs",
      "_origin": "ast",
      "community": 4,
      "file_type": "code",
      "norm_label": "bcryptjs",
      "source_file": "backend/package.json",
      "source_location": "L15"
    },
    {
      "id": "backend_package_dependencies_cors",
      "label": "cors",
      "_origin": "ast",
      "community": 4,
      "file_type": "code",
      "norm_label": "cors",
      "source_file": "backend/package.json",
      "source_location": "L16"
    },
    {
      "id": "backend_package_dependencies_dotenv",
      "label": "dotenv",
      "_origin": "ast",
      "community": 4,
      "file_type": "code",
      "norm_label": "dotenv",
      "source_file": "backend/package.json",
      "source_location": "L17"
    },
    {
      "id": "backend_package_dependencies_express",
      "label": "express",
      "_origin": "ast",
      "community": 4,
      "file_type": "code",
      "norm_label": "express",
      "source_file": "backend/package.json",
      "source_location": "L18"
    },
    {
      "id": "backend_package_dependencies_jsonwebtoken",
      "label": "jsonwebtoken",
      "_origin": "ast",
      "community": 4,
      "file_type": "code",
      "norm_label": "jsonwebtoken",
      "source_file": "backend/package.json",
      "source_location": "L19"
    },
    {
      "id": "backend_package_dependencies_mongoose",
      "label": "mongoose",
      "_origin": "ast",
      "community": 4,
      "file_type": "code",
      "norm_label": "mongoose",
      "source_file": "backend/package.json",
      "source_location": "L20"
    },
    {
      "id": "backend_package_dependencies_mysql2",
      "label": "mysql2",
      "_origin": "ast",
      "community": 4,
      "file_type": "code",
      "norm_label": "mysql2",
      "source_file": "backend/package.json",
      "source_location": "L21"
    },
    {
      "id": "frontend_package_dependencies",
      "label": "dependencies",
      "_origin": "ast",
      "community": 5,
      "file_type": "code",
      "norm_label": "dependencies",
      "source_file": "frontend/package.json",
      "source_location": "L12"
    },
    {
      "id": "frontend_package_dependencies_lucide_react",
      "label": "lucide-react",
      "_origin": "ast",
      "community": 5,
      "file_type": "code",
      "norm_label": "lucide-react",
      "source_file": "frontend/package.json",
      "source_location": "L14"
    },
    {
      "id": "frontend_package_dependencies_react",
      "label": "react",
      "_origin": "ast",
      "community": 5,
      "file_type": "code",
      "norm_label": "react",
      "source_file": "frontend/package.json",
      "source_location": "L15"
    },
    {
      "id": "frontend_package_dependencies_react_dom",
      "label": "react-dom",
      "_origin": "ast",
      "community": 5,
      "file_type": "code",
      "norm_label": "react-dom",
      "source_file": "frontend/package.json",
      "source_location": "L16"
    },
    {
      "id": "frontend_package_dependencies_react_router_dom",
      "label": "react-router-dom",
      "_origin": "ast",
      "community": 5,
      "file_type": "code",
      "norm_label": "react-router-dom",
      "source_file": "frontend/package.json",
      "source_location": "L17"
    },
    {
      "id": "frontend_package_dependencies_tailwindcss",
      "label": "tailwindcss",
      "_origin": "ast",
      "community": 5,
      "file_type": "code",
      "norm_label": "tailwindcss",
      "source_file": "frontend/package.json",
      "source_location": "L18"
    },
    {
      "id": "frontend_package_dependencies_tailwindcss_vite",
      "label": "@tailwindcss/vite",
      "_origin": "ast",
      "community": 5,
      "file_type": "code",
      "norm_label": "@tailwindcss/vite",
      "source_file": "frontend/package.json",
      "source_location": "L13"
    },
    {
      "id": "frontend_oxlintrc",
      "label": ".oxlintrc.json",
      "_origin": "ast",
      "community": 6,
      "file_type": "code",
      "norm_label": ".oxlintrc.json",
      "source_file": "frontend/.oxlintrc.json",
      "source_location": "L1"
    },
    {
      "id": "frontend_oxlintrc_plugins",
      "label": "plugins",
      "_origin": "ast",
      "community": 6,
      "file_type": "code",
      "norm_label": "plugins",
      "source_file": "frontend/.oxlintrc.json",
      "source_location": "L3"
    },
    {
      "id": "frontend_oxlintrc_rules",
      "label": "rules",
      "_origin": "ast",
      "community": 6,
      "file_type": "code",
      "norm_label": "rules",
      "source_file": "frontend/.oxlintrc.json",
      "source_location": "L4"
    },
    {
      "id": "frontend_oxlintrc_rules_react_only_export_components",
      "label": "react/only-export-components",
      "_origin": "ast",
      "community": 6,
      "file_type": "code",
      "norm_label": "react/only-export-components",
      "source_file": "frontend/.oxlintrc.json",
      "source_location": "L6"
    },
    {
      "id": "frontend_oxlintrc_rules_react_rules_of_hooks",
      "label": "react/rules-of-hooks",
      "_origin": "ast",
      "community": 6,
      "file_type": "code",
      "norm_label": "react/rules-of-hooks",
      "source_file": "frontend/.oxlintrc.json",
      "source_location": "L5"
    },
    {
      "id": "frontend_oxlintrc_schema",
      "label": "$schema",
      "_origin": "ast",
      "community": 6,
      "file_type": "code",
      "norm_label": "$schema",
      "source_file": "frontend/.oxlintrc.json",
      "source_location": "L2"
    },
    {
      "id": "frontend_package_devdependencies",
      "label": "devDependencies",
      "_origin": "ast",
      "community": 7,
      "file_type": "code",
      "norm_label": "devdependencies",
      "source_file": "frontend/package.json",
      "source_location": "L20"
    },
    {
      "id": "frontend_package_devdependencies_oxlint",
      "label": "oxlint",
      "_origin": "ast",
      "community": 7,
      "file_type": "code",
      "norm_label": "oxlint",
      "source_file": "frontend/package.json",
      "source_location": "L24"
    },
    {
      "id": "frontend_package_devdependencies_types_react",
      "label": "@types/react",
      "_origin": "ast",
      "community": 7,
      "file_type": "code",
      "norm_label": "@types/react",
      "source_file": "frontend/package.json",
      "source_location": "L21"
    },
    {
      "id": "frontend_package_devdependencies_types_react_dom",
      "label": "@types/react-dom",
      "_origin": "ast",
      "community": 7,
      "file_type": "code",
      "norm_label": "@types/react-dom",
      "source_file": "frontend/package.json",
      "source_location": "L22"
    },
    {
      "id": "frontend_package_devdependencies_vite",
      "label": "vite",
      "_origin": "ast",
      "community": 7,
      "file_type": "code",
      "norm_label": "vite",
      "source_file": "frontend/package.json",
      "source_location": "L25"
    },
    {
      "id": "frontend_package_devdependencies_vitejs_plugin_react",
      "label": "@vitejs/plugin-react",
      "_origin": "ast",
      "community": 7,
      "file_type": "code",
      "norm_label": "@vitejs/plugin-react",
      "source_file": "frontend/package.json",
      "source_location": "L23"
    },
    {
      "id": "frontend_package_scripts",
      "label": "scripts",
      "_origin": "ast",
      "community": 8,
      "file_type": "code",
      "norm_label": "scripts",
      "source_file": "frontend/package.json",
      "source_location": "L6"
    },
    {
      "id": "frontend_package_scripts_build",
      "label": "build",
      "_origin": "ast",
      "community": 8,
      "file_type": "code",
      "norm_label": "build",
      "source_file": "frontend/package.json",
      "source_location": "L8"
    },
    {
      "id": "frontend_package_scripts_dev",
      "label": "dev",
      "_origin": "ast",
      "community": 8,
      "file_type": "code",
      "norm_label": "dev",
      "source_file": "frontend/package.json",
      "source_location": "L7"
    },
    {
      "id": "frontend_package_scripts_lint",
      "label": "lint",
      "_origin": "ast",
      "community": 8,
      "file_type": "code",
      "norm_label": "lint",
      "source_file": "frontend/package.json",
      "source_location": "L9"
    },
    {
      "id": "frontend_package_scripts_preview",
      "label": "preview",
      "_origin": "ast",
      "community": 8,
      "file_type": "code",
      "norm_label": "preview",
      "source_file": "frontend/package.json",
      "source_location": "L10"
    }
  ],
  "links": [
    {
      "source": "backend_package",
      "target": "ref_bcrypt",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "backend/package.json",
      "source_location": "L14",
      "weight": 1.0
    },
    {
      "source": "backend_package",
      "target": "ref_bcryptjs",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "backend/package.json",
      "source_location": "L15",
      "weight": 1.0
    },
    {
      "source": "backend_package",
      "target": "ref_cors",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "backend/package.json",
      "source_location": "L16",
      "weight": 1.0
    },
    {
      "source": "backend_package",
      "target": "ref_dotenv",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "backend/package.json",
      "source_location": "L17",
      "weight": 1.0
    },
    {
      "source": "backend_package",
      "target": "ref_express",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "backend/package.json",
      "source_location": "L18",
      "weight": 1.0
    },
    {
      "source": "backend_package",
      "target": "ref_jsonwebtoken",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "backend/package.json",
      "source_location": "L19",
      "weight": 1.0
    },
    {
      "source": "backend_package",
      "target": "ref_mongoose",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "backend/package.json",
      "source_location": "L20",
      "weight": 1.0
    },
    {
      "source": "backend_package",
      "target": "ref_mysql2",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "backend/package.json",
      "source_location": "L21",
      "weight": 1.0
    },
    {
      "source": "frontend_package",
      "target": "ref_tailwindcss_vite",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/package.json",
      "source_location": "L13",
      "weight": 1.0
    },
    {
      "source": "frontend_package",
      "target": "ref_lucide_react",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/package.json",
      "source_location": "L14",
      "weight": 1.0
    },
    {
      "source": "frontend_package",
      "target": "ref_react",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/package.json",
      "source_location": "L15",
      "weight": 1.0
    },
    {
      "source": "frontend_package",
      "target": "ref_react_dom",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/package.json",
      "source_location": "L16",
      "weight": 1.0
    },
    {
      "source": "frontend_package",
      "target": "ref_react_router_dom",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/package.json",
      "source_location": "L17",
      "weight": 1.0
    },
    {
      "source": "frontend_package",
      "target": "ref_tailwindcss",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/package.json",
      "source_location": "L18",
      "weight": 1.0
    },
    {
      "source": "frontend_package",
      "target": "ref_types_react",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/package.json",
      "source_location": "L21",
      "weight": 1.0
    },
    {
      "source": "frontend_package",
      "target": "ref_types_react_dom",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/package.json",
      "source_location": "L22",
      "weight": 1.0
    },
    {
      "source": "frontend_package",
      "target": "ref_vitejs_plugin_react",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/package.json",
      "source_location": "L23",
      "weight": 1.0
    },
    {
      "source": "frontend_package",
      "target": "ref_oxlint",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/package.json",
      "source_location": "L24",
      "weight": 1.0
    },
    {
      "source": "frontend_package",
      "target": "ref_vite",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/package.json",
      "source_location": "L25",
      "weight": 1.0
    },
    {
      "source": "frontend_src_app",
      "target": "frontend_src_component_navbar_navbar",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/App.jsx",
      "source_location": "L3",
      "weight": 1.0
    },
    {
      "source": "frontend_src_app",
      "target": "frontend_src_pages_login_login",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/App.jsx",
      "source_location": "L4",
      "weight": 1.0
    },
    {
      "source": "frontend_src_app",
      "target": "frontend_src_pages_register_register",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/App.jsx",
      "source_location": "L5",
      "weight": 1.0
    },
    {
      "source": "frontend_src_app",
      "target": "frontend_src_pages_vendor_vendor",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/App.jsx",
      "source_location": "L6",
      "weight": 1.0
    },
    {
      "source": "frontend_src_app",
      "target": "frontend_src_pages_packages_packages",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/App.jsx",
      "source_location": "L7",
      "weight": 1.0
    },
    {
      "source": "frontend_src_app",
      "target": "frontend_src_pages_admindashboard_admindashboard",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/App.jsx",
      "source_location": "L8",
      "weight": 1.0
    },
    {
      "source": "frontend_src_app",
      "target": "frontend_src_pages_venuedashboard_venuedashboard",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/App.jsx",
      "source_location": "L9",
      "weight": 1.0
    },
    {
      "source": "frontend_src_main",
      "target": "frontend_src_app_app",
      "relation": "imports",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/main.jsx",
      "source_location": "L4",
      "weight": 1.0
    },
    {
      "source": "backend_models_user",
      "target": "ref_mongoose",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "backend/models/user.js",
      "source_location": "L1",
      "weight": 1.0
    },
    {
      "source": "backend_routes_adminroutes",
      "target": "ref_express",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "backend/routes/adminRoutes.js",
      "source_location": "L1",
      "weight": 1.0
    },
    {
      "source": "backend_routes_adminroutes",
      "target": "backend_db",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "backend/routes/adminRoutes.js",
      "source_location": "L3",
      "weight": 1.0
    },
    {
      "source": "backend_routes_authroute",
      "target": "ref_express",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "backend/routes/authRoute.js",
      "source_location": "L1",
      "weight": 1.0
    },
    {
      "source": "backend_routes_authroute",
      "target": "ref_bcryptjs",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "backend/routes/authRoute.js",
      "source_location": "L3",
      "weight": 1.0
    },
    {
      "source": "backend_routes_authroute",
      "target": "ref_jsonwebtoken",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "backend/routes/authRoute.js",
      "source_location": "L4",
      "weight": 1.0
    },
    {
      "source": "backend_routes_authroute",
      "target": "backend_db",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "backend/routes/authRoute.js",
      "source_location": "L5",
      "weight": 1.0
    },
    {
      "source": "backend_server",
      "target": "ref_express",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "backend/server.js",
      "source_location": "L1",
      "weight": 1.0
    },
    {
      "source": "backend_server",
      "target": "ref_cors",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "backend/server.js",
      "source_location": "L2",
      "weight": 1.0
    },
    {
      "source": "backend_server",
      "target": "backend_db",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "backend/server.js",
      "source_location": "L4",
      "weight": 1.0
    },
    {
      "source": "backend_server",
      "target": "backend_routes_adminroutes",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "backend/server.js",
      "source_location": "L7",
      "weight": 1.0
    },
    {
      "source": "backend_server",
      "target": "backend_routes_authroute",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "backend/server.js",
      "source_location": "L8",
      "weight": 1.0
    },
    {
      "source": "frontend_src_app",
      "target": "ref_react_router_dom",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/App.jsx",
      "source_location": "L1",
      "weight": 1.0
    },
    {
      "source": "frontend_src_app",
      "target": "ref_lucide_react",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/App.jsx",
      "source_location": "L2",
      "weight": 1.0
    },
    {
      "source": "frontend_src_app",
      "target": "frontend_src_component_navbar",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/App.jsx",
      "source_location": "L3",
      "weight": 1.0
    },
    {
      "source": "frontend_src_app",
      "target": "frontend_src_pages_login",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/App.jsx",
      "source_location": "L4",
      "weight": 1.0
    },
    {
      "source": "frontend_src_app",
      "target": "frontend_src_pages_register",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/App.jsx",
      "source_location": "L5",
      "weight": 1.0
    },
    {
      "source": "frontend_src_app",
      "target": "frontend_src_pages_vendor",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/App.jsx",
      "source_location": "L6",
      "weight": 1.0
    },
    {
      "source": "frontend_src_app",
      "target": "frontend_src_pages_packages",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/App.jsx",
      "source_location": "L7",
      "weight": 1.0
    },
    {
      "source": "frontend_src_app",
      "target": "frontend_src_pages_admindashboard",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/App.jsx",
      "source_location": "L8",
      "weight": 1.0
    },
    {
      "source": "frontend_src_app",
      "target": "frontend_src_pages_venuedashboard",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/App.jsx",
      "source_location": "L9",
      "weight": 1.0
    },
    {
      "source": "frontend_src_component_navbar",
      "target": "ref_react_router_dom",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/component/Navbar.jsx",
      "source_location": "L1",
      "weight": 1.0
    },
    {
      "source": "frontend_src_component_navbar",
      "target": "ref_lucide_react",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/component/Navbar.jsx",
      "source_location": "L2",
      "weight": 1.0
    },
    {
      "source": "frontend_src_main",
      "target": "ref_react",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/main.jsx",
      "source_location": "L1",
      "weight": 1.0
    },
    {
      "source": "frontend_src_main",
      "target": "frontend_src_app",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/main.jsx",
      "source_location": "L4",
      "weight": 1.0
    },
    {
      "source": "frontend_src_pages_admindashboard",
      "target": "ref_react",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/pages/AdminDashboard.jsx",
      "source_location": "L1",
      "weight": 1.0
    },
    {
      "source": "frontend_src_pages_admindashboard",
      "target": "ref_lucide_react",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/pages/AdminDashboard.jsx",
      "source_location": "L2",
      "weight": 1.0
    },
    {
      "source": "frontend_src_pages_admindashboard",
      "target": "ref_react_router_dom",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/pages/AdminDashboard.jsx",
      "source_location": "L3",
      "weight": 1.0
    },
    {
      "source": "frontend_src_pages_login",
      "target": "ref_react",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/pages/logIn.jsx",
      "source_location": "L1",
      "weight": 1.0
    },
    {
      "source": "frontend_src_pages_login",
      "target": "ref_react_router_dom",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/pages/logIn.jsx",
      "source_location": "L2",
      "weight": 1.0
    },
    {
      "source": "frontend_src_pages_login",
      "target": "ref_lucide_react",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/pages/logIn.jsx",
      "source_location": "L3",
      "weight": 1.0
    },
    {
      "source": "frontend_src_pages_packages",
      "target": "ref_lucide_react",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/pages/Packages.jsx",
      "source_location": "L1",
      "weight": 1.0
    },
    {
      "source": "frontend_src_pages_register",
      "target": "ref_react",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/pages/register.jsx",
      "source_location": "L1",
      "weight": 1.0
    },
    {
      "source": "frontend_src_pages_register",
      "target": "ref_react_router_dom",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/pages/register.jsx",
      "source_location": "L2",
      "weight": 1.0
    },
    {
      "source": "frontend_src_pages_register",
      "target": "ref_lucide_react",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/pages/register.jsx",
      "source_location": "L3",
      "weight": 1.0
    },
    {
      "source": "frontend_src_pages_vendor",
      "target": "ref_react",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/pages/Vendor.jsx",
      "source_location": "L1",
      "weight": 1.0
    },
    {
      "source": "frontend_src_pages_vendor",
      "target": "ref_lucide_react",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/pages/Vendor.jsx",
      "source_location": "L2",
      "weight": 1.0
    },
    {
      "source": "frontend_src_pages_venuedashboard",
      "target": "ref_react",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/pages/VenueDashboard.jsx",
      "source_location": "L1",
      "weight": 1.0
    },
    {
      "source": "frontend_src_pages_venuedashboard",
      "target": "ref_react_router_dom",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/pages/VenueDashboard.jsx",
      "source_location": "L2",
      "weight": 1.0
    },
    {
      "source": "frontend_src_pages_venuedashboard",
      "target": "ref_lucide_react",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/src/pages/VenueDashboard.jsx",
      "source_location": "L3",
      "weight": 1.0
    },
    {
      "source": "frontend_vite_config",
      "target": "ref_vite",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/vite.config.js",
      "source_location": "L1",
      "weight": 1.0
    },
    {
      "source": "frontend_vite_config",
      "target": "ref_vitejs_plugin_react",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/vite.config.js",
      "source_location": "L2",
      "weight": 1.0
    },
    {
      "source": "frontend_vite_config",
      "target": "ref_tailwindcss_vite",
      "relation": "imports_from",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "context": "import",
      "source_file": "frontend/vite.config.js",
      "source_location": "L3",
      "weight": 1.0
    },
    {
      "source": "backend_db",
      "target": "backend_db_mysql",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/db.js",
      "source_location": "L1",
      "weight": 1.0
    },
    {
      "source": "backend_db",
      "target": "backend_db_pool",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/db.js",
      "source_location": "L4",
      "weight": 1.0
    },
    {
      "source": "backend_models_user",
      "target": "backend_models_user_mongoose",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/models/user.js",
      "source_location": "L1",
      "weight": 1.0
    },
    {
      "source": "backend_models_user",
      "target": "backend_models_user_userschema",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/models/user.js",
      "source_location": "L3",
      "weight": 1.0
    },
    {
      "source": "backend_package",
      "target": "backend_package_author",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/package.json",
      "source_location": "L10",
      "weight": 1.0
    },
    {
      "source": "backend_package",
      "target": "backend_package_license",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/package.json",
      "source_location": "L11",
      "weight": 1.0
    },
    {
      "source": "backend_package",
      "target": "backend_package_type",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/package.json",
      "source_location": "L12",
      "weight": 1.0
    },
    {
      "source": "backend_package",
      "target": "backend_package_dependencies",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/package.json",
      "source_location": "L13",
      "weight": 1.0
    },
    {
      "source": "backend_package",
      "target": "backend_package_name",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/package.json",
      "source_location": "L2",
      "weight": 1.0
    },
    {
      "source": "backend_package",
      "target": "backend_package_version",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/package.json",
      "source_location": "L3",
      "weight": 1.0
    },
    {
      "source": "backend_package",
      "target": "backend_package_description",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/package.json",
      "source_location": "L4",
      "weight": 1.0
    },
    {
      "source": "backend_package",
      "target": "backend_package_main",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/package.json",
      "source_location": "L5",
      "weight": 1.0
    },
    {
      "source": "backend_package",
      "target": "backend_package_scripts",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/package.json",
      "source_location": "L6",
      "weight": 1.0
    },
    {
      "source": "backend_package",
      "target": "backend_package_keywords",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/package.json",
      "source_location": "L9",
      "weight": 1.0
    },
    {
      "source": "backend_package_dependencies",
      "target": "backend_package_dependencies_bcrypt",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/package.json",
      "source_location": "L14",
      "weight": 1.0
    },
    {
      "source": "backend_package_dependencies",
      "target": "backend_package_dependencies_bcryptjs",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/package.json",
      "source_location": "L15",
      "weight": 1.0
    },
    {
      "source": "backend_package_dependencies",
      "target": "backend_package_dependencies_cors",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/package.json",
      "source_location": "L16",
      "weight": 1.0
    },
    {
      "source": "backend_package_dependencies",
      "target": "backend_package_dependencies_dotenv",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/package.json",
      "source_location": "L17",
      "weight": 1.0
    },
    {
      "source": "backend_package_dependencies",
      "target": "backend_package_dependencies_express",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/package.json",
      "source_location": "L18",
      "weight": 1.0
    },
    {
      "source": "backend_package_dependencies",
      "target": "backend_package_dependencies_jsonwebtoken",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/package.json",
      "source_location": "L19",
      "weight": 1.0
    },
    {
      "source": "backend_package_dependencies",
      "target": "backend_package_dependencies_mongoose",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/package.json",
      "source_location": "L20",
      "weight": 1.0
    },
    {
      "source": "backend_package_dependencies",
      "target": "backend_package_dependencies_mysql2",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/package.json",
      "source_location": "L21",
      "weight": 1.0
    },
    {
      "source": "backend_package_scripts",
      "target": "backend_package_scripts_test",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/package.json",
      "source_location": "L7",
      "weight": 1.0
    },
    {
      "source": "backend_routes_adminroutes",
      "target": "backend_routes_adminroutes_express",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/routes/adminRoutes.js",
      "source_location": "L1",
      "weight": 1.0
    },
    {
      "source": "backend_routes_adminroutes",
      "target": "backend_routes_adminroutes_router",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/routes/adminRoutes.js",
      "source_location": "L2",
      "weight": 1.0
    },
    {
      "source": "backend_routes_adminroutes",
      "target": "backend_routes_adminroutes_db",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/routes/adminRoutes.js",
      "source_location": "L3",
      "weight": 1.0
    },
    {
      "source": "backend_routes_authroute",
      "target": "backend_routes_authroute_express",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/routes/authRoute.js",
      "source_location": "L1",
      "weight": 1.0
    },
    {
      "source": "backend_routes_authroute",
      "target": "backend_routes_authroute_router",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/routes/authRoute.js",
      "source_location": "L2",
      "weight": 1.0
    },
    {
      "source": "backend_routes_authroute",
      "target": "backend_routes_authroute_bcrypt",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/routes/authRoute.js",
      "source_location": "L3",
      "weight": 1.0
    },
    {
      "source": "backend_routes_authroute",
      "target": "backend_routes_authroute_jwt",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/routes/authRoute.js",
      "source_location": "L4",
      "weight": 1.0
    },
    {
      "source": "backend_routes_authroute",
      "target": "backend_routes_authroute_db",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/routes/authRoute.js",
      "source_location": "L5",
      "weight": 1.0
    },
    {
      "source": "backend_server",
      "target": "backend_server_express",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/server.js",
      "source_location": "L1",
      "weight": 1.0
    },
    {
      "source": "backend_server",
      "target": "backend_server_app",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/server.js",
      "source_location": "L10",
      "weight": 1.0
    },
    {
      "source": "backend_server",
      "target": "backend_server_cors",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/server.js",
      "source_location": "L2",
      "weight": 1.0
    },
    {
      "source": "backend_server",
      "target": "backend_server_db",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/server.js",
      "source_location": "L4",
      "weight": 1.0
    },
    {
      "source": "backend_server",
      "target": "backend_server_adminroutes",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/server.js",
      "source_location": "L7",
      "weight": 1.0
    },
    {
      "source": "backend_server",
      "target": "backend_server_authroutes",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "backend/server.js",
      "source_location": "L8",
      "weight": 1.0
    },
    {
      "source": "frontend_oxlintrc",
      "target": "frontend_oxlintrc_schema",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/.oxlintrc.json",
      "source_location": "L2",
      "weight": 1.0
    },
    {
      "source": "frontend_oxlintrc",
      "target": "frontend_oxlintrc_plugins",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/.oxlintrc.json",
      "source_location": "L3",
      "weight": 1.0
    },
    {
      "source": "frontend_oxlintrc",
      "target": "frontend_oxlintrc_rules",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/.oxlintrc.json",
      "source_location": "L4",
      "weight": 1.0
    },
    {
      "source": "frontend_oxlintrc_rules",
      "target": "frontend_oxlintrc_rules_react_rules_of_hooks",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/.oxlintrc.json",
      "source_location": "L5",
      "weight": 1.0
    },
    {
      "source": "frontend_oxlintrc_rules",
      "target": "frontend_oxlintrc_rules_react_only_export_components",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/.oxlintrc.json",
      "source_location": "L6",
      "weight": 1.0
    },
    {
      "source": "frontend_package",
      "target": "frontend_package_dependencies",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/package.json",
      "source_location": "L12",
      "weight": 1.0
    },
    {
      "source": "frontend_package",
      "target": "frontend_package_name",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/package.json",
      "source_location": "L2",
      "weight": 1.0
    },
    {
      "source": "frontend_package",
      "target": "frontend_package_devdependencies",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/package.json",
      "source_location": "L20",
      "weight": 1.0
    },
    {
      "source": "frontend_package",
      "target": "frontend_package_private",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/package.json",
      "source_location": "L3",
      "weight": 1.0
    },
    {
      "source": "frontend_package",
      "target": "frontend_package_version",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/package.json",
      "source_location": "L4",
      "weight": 1.0
    },
    {
      "source": "frontend_package",
      "target": "frontend_package_type",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/package.json",
      "source_location": "L5",
      "weight": 1.0
    },
    {
      "source": "frontend_package",
      "target": "frontend_package_scripts",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/package.json",
      "source_location": "L6",
      "weight": 1.0
    },
    {
      "source": "frontend_package_dependencies",
      "target": "frontend_package_dependencies_tailwindcss_vite",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/package.json",
      "source_location": "L13",
      "weight": 1.0
    },
    {
      "source": "frontend_package_dependencies",
      "target": "frontend_package_dependencies_lucide_react",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/package.json",
      "source_location": "L14",
      "weight": 1.0
    },
    {
      "source": "frontend_package_dependencies",
      "target": "frontend_package_dependencies_react",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/package.json",
      "source_location": "L15",
      "weight": 1.0
    },
    {
      "source": "frontend_package_dependencies",
      "target": "frontend_package_dependencies_react_dom",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/package.json",
      "source_location": "L16",
      "weight": 1.0
    },
    {
      "source": "frontend_package_dependencies",
      "target": "frontend_package_dependencies_react_router_dom",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/package.json",
      "source_location": "L17",
      "weight": 1.0
    },
    {
      "source": "frontend_package_dependencies",
      "target": "frontend_package_dependencies_tailwindcss",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/package.json",
      "source_location": "L18",
      "weight": 1.0
    },
    {
      "source": "frontend_package_devdependencies",
      "target": "frontend_package_devdependencies_types_react",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/package.json",
      "source_location": "L21",
      "weight": 1.0
    },
    {
      "source": "frontend_package_devdependencies",
      "target": "frontend_package_devdependencies_types_react_dom",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/package.json",
      "source_location": "L22",
      "weight": 1.0
    },
    {
      "source": "frontend_package_devdependencies",
      "target": "frontend_package_devdependencies_vitejs_plugin_react",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/package.json",
      "source_location": "L23",
      "weight": 1.0
    },
    {
      "source": "frontend_package_devdependencies",
      "target": "frontend_package_devdependencies_oxlint",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/package.json",
      "source_location": "L24",
      "weight": 1.0
    },
    {
      "source": "frontend_package_devdependencies",
      "target": "frontend_package_devdependencies_vite",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/package.json",
      "source_location": "L25",
      "weight": 1.0
    },
    {
      "source": "frontend_package_scripts",
      "target": "frontend_package_scripts_preview",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/package.json",
      "source_location": "L10",
      "weight": 1.0
    },
    {
      "source": "frontend_package_scripts",
      "target": "frontend_package_scripts_dev",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/package.json",
      "source_location": "L7",
      "weight": 1.0
    },
    {
      "source": "frontend_package_scripts",
      "target": "frontend_package_scripts_build",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/package.json",
      "source_location": "L8",
      "weight": 1.0
    },
    {
      "source": "frontend_package_scripts",
      "target": "frontend_package_scripts_lint",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/package.json",
      "source_location": "L9",
      "weight": 1.0
    },
    {
      "source": "frontend_src_app",
      "target": "frontend_src_app_home",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/src/App.jsx",
      "source_location": "L11",
      "weight": 1.0
    },
    {
      "source": "frontend_src_app",
      "target": "frontend_src_app_layout",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/src/App.jsx",
      "source_location": "L138",
      "weight": 1.0
    },
    {
      "source": "frontend_src_app",
      "target": "frontend_src_app_app",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/src/App.jsx",
      "source_location": "L163",
      "weight": 1.0
    },
    {
      "source": "frontend_src_component_navbar",
      "target": "frontend_src_component_navbar_navbar",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/src/component/Navbar.jsx",
      "source_location": "L4",
      "weight": 1.0
    },
    {
      "source": "frontend_src_pages_admindashboard",
      "target": "frontend_src_pages_admindashboard_admindashboard",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/src/pages/AdminDashboard.jsx",
      "source_location": "L5",
      "weight": 1.0
    },
    {
      "source": "frontend_src_pages_login",
      "target": "frontend_src_pages_login_login",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/src/pages/logIn.jsx",
      "source_location": "L5",
      "weight": 1.0
    },
    {
      "source": "frontend_src_pages_packages",
      "target": "frontend_src_pages_packages_packages",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/src/pages/Packages.jsx",
      "source_location": "L3",
      "weight": 1.0
    },
    {
      "source": "frontend_src_pages_register",
      "target": "frontend_src_pages_register_register",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/src/pages/register.jsx",
      "source_location": "L5",
      "weight": 1.0
    },
    {
      "source": "frontend_src_pages_vendor",
      "target": "frontend_src_pages_vendor_vendor",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/src/pages/Vendor.jsx",
      "source_location": "L4",
      "weight": 1.0
    },
    {
      "source": "frontend_src_pages_venuedashboard",
      "target": "frontend_src_pages_venuedashboard_venuedashboard",
      "relation": "contains",
      "_origin": "ast",
      "confidence": "EXTRACTED",
      "confidence_score": 1.0,
      "source_file": "frontend/src/pages/VenueDashboard.jsx",
      "source_location": "L8",
      "weight": 1.0
    }
  ],
  "hyperedges": [],
  "built_at_commit": "369bb91d47d9ce70694c4ede0d4946f9362d1905"
}
```

## File: graphify-out/manifest.json
```json
{
  "backend/db.js": {
    "mtime": 1789052045.1912632,
    "seen": 1789392286.1285543,
    "ast_hash": "bd624a7ce9337d3ee714541f9b8096f2",
    "semantic_hash": "bd624a7ce9337d3ee714541f9b8096f2"
  },
  "backend/models/user.js": {
    "mtime": 1789139972.741297,
    "seen": 1789392286.1285589,
    "ast_hash": "28d105a7eff05fdd6c5df4afb8913f83",
    "semantic_hash": "28d105a7eff05fdd6c5df4afb8913f83"
  },
  "backend/package.json": {
    "mtime": 1789140272.9169292,
    "seen": 1789392286.1285608,
    "ast_hash": "e834094d8423ced323918c0708c69a68",
    "semantic_hash": "e834094d8423ced323918c0708c69a68"
  },
  "backend/routes/adminRoutes.js": {
    "mtime": 1789141990.9430866,
    "seen": 1789392286.1285622,
    "ast_hash": "00da43ed6d984ed798d13d4078376bdb",
    "semantic_hash": "00da43ed6d984ed798d13d4078376bdb"
  },
  "backend/routes/authRoute.js": {
    "mtime": 1789145385.9702728,
    "seen": 1789392286.1285632,
    "ast_hash": "fd3be7e766d3998814131cb669f5cd5e",
    "semantic_hash": "fd3be7e766d3998814131cb669f5cd5e"
  },
  "backend/server.js": {
    "mtime": 1789141982.5814135,
    "seen": 1789392286.1285641,
    "ast_hash": "ab35133f1c092985d34e57424b075c51",
    "semantic_hash": "ab35133f1c092985d34e57424b075c51"
  },
  "frontend/.oxlintrc.json": {
    "mtime": 1789050620.108892,
    "seen": 1789392286.1285655,
    "ast_hash": "5e6e3cea3e89137071c142dd7835b0ef",
    "semantic_hash": "5e6e3cea3e89137071c142dd7835b0ef"
  },
  "frontend/package.json": {
    "mtime": 1789051421.0766592,
    "seen": 1789392286.1285663,
    "ast_hash": "1afb267a4db2201b50a1f23d6fb5e779",
    "semantic_hash": "1afb267a4db2201b50a1f23d6fb5e779"
  },
  "frontend/src/App.jsx": {
    "mtime": 1789146824.7148056,
    "seen": 1789392286.1285677,
    "ast_hash": "8454830cbc6f5ff9f8df50a12da8d6c0",
    "semantic_hash": "8454830cbc6f5ff9f8df50a12da8d6c0"
  },
  "frontend/src/component/Navbar.jsx": {
    "mtime": 1789157387.5560832,
    "seen": 1789392286.1285686,
    "ast_hash": "2e7d266a8ef5585c60f5fdc403ce8d0d",
    "semantic_hash": "2e7d266a8ef5585c60f5fdc403ce8d0d"
  },
  "frontend/src/main.jsx": {
    "mtime": 1789050620.1253493,
    "seen": 1789392286.1285696,
    "ast_hash": "e13723e2574429d9a6d849727e3ff695",
    "semantic_hash": "e13723e2574429d9a6d849727e3ff695"
  },
  "frontend/src/pages/AdminDashboard.jsx": {
    "mtime": 1789163118.5045364,
    "seen": 1789392286.1285706,
    "ast_hash": "8e213749e1b0a97ab102ea1d0c9c80f6",
    "semantic_hash": "8e213749e1b0a97ab102ea1d0c9c80f6"
  },
  "frontend/src/pages/Packages.jsx": {
    "mtime": 1789072214.226106,
    "seen": 1789392286.1285717,
    "ast_hash": "2faa82d41c47911872e9f6feeb9ddadb",
    "semantic_hash": "2faa82d41c47911872e9f6feeb9ddadb"
  },
  "frontend/src/pages/Vendor.jsx": {
    "mtime": 1789073382.175666,
    "seen": 1789392286.1285727,
    "ast_hash": "d7886a636428485c207daae32bcea8bb",
    "semantic_hash": "d7886a636428485c207daae32bcea8bb"
  },
  "frontend/src/pages/VenueDashboard.jsx": {
    "mtime": 1789159390.7198095,
    "seen": 1789392286.1285734,
    "ast_hash": "4374c13dc101776d067b31d09edf320c",
    "semantic_hash": "4374c13dc101776d067b31d09edf320c"
  },
  "frontend/src/pages/logIn.jsx": {
    "mtime": 1789140310.9510212,
    "seen": 1789392286.1285744,
    "ast_hash": "2423df68ae85c5a95ed02be158752b9c",
    "semantic_hash": "2423df68ae85c5a95ed02be158752b9c"
  },
  "frontend/src/pages/register.jsx": {
    "mtime": 1789073997.3283472,
    "seen": 1789392286.1285758,
    "ast_hash": "4033cbab1d2753ad78c30b2b6abd12fd",
    "semantic_hash": "4033cbab1d2753ad78c30b2b6abd12fd"
  },
  "frontend/vite.config.js": {
    "mtime": 1789050974.7329004,
    "seen": 1789392286.128577,
    "ast_hash": "f955ee4eeae138a29188424d174b28b7",
    "semantic_hash": "f955ee4eeae138a29188424d174b28b7"
  }
}
```

## File: backend/models/user.js
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: {
    type: String,
    enum: ['customer', 'venue_owner', 'vendor'],
    default: 'customer'
  },
  // Here is the status block placed correctly inside the schema!
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
```

## File: backend/routes/adminRoutes.js
```javascript
const express = require('express');
const router = express.Router();
const db = require('../db'); // Pulls in your MySQL connection from db.js

// ==========================================
// 1. GET ALL PENDING USERS
// ==========================================
router.get('/pending-users', async (req, res) => {
  try {
    // Select all users where the approval status is 'pending'
    const [pendingUsers] = await db.query(
      "SELECT id, name, email, role, status, created_at FROM users WHERE status = 'pending'"
    );
    res.status(200).json(pendingUsers);
  } catch (error) {
    console.error("Error fetching pending users:", error);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
});

// ==========================================
// 2. APPROVE A USER (PUT)
// ==========================================
router.put('/approve-user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Update the user's status to 'approved' in MySQL using their numeric ID
    const [result] = await db.query(
      "UPDATE users SET status = 'approved' WHERE id = ?", 
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User successfully approved' });
  } catch (error) {
    console.error("Error approving user:", error);
    res.status(500).json({ message: 'Server error during approval' });
  }
});

// ==========================================
// 3. REJECT / DELETE A USER (DELETE)
// ==========================================
router.delete('/reject-user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Delete the unapproved user completely from MySQL
    const [result] = await db.query(
      "DELETE FROM users WHERE id = ?", 
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User rejected and removed' });
  } catch (error) {
    console.error("Error rejecting user:", error);
    res.status(500).json({ message: 'Server error during rejection' });
  }
});

module.exports = router;
```

## File: backend/routes/authRoute.js
```javascript
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Pulls in your MySQL connection

const JWT_SECRET = process.env.JWT_SECRET || 'event_booking_super_secret_key_123';

// ==========================================
// 1. REGISTER ROUTE
// ==========================================
router.post('/register', async (req, res) => {
  const { name, email, password, role, phone } = req.body;
  
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    // Check if user already exists
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Customers are approved instantly; Venue Owners & Vendors must wait for Admin
    const initialStatus = role === 'customer' ? 'approved' : 'pending';

    // Insert new user into MySQL
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role, status, phone) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, role, initialStatus, phone || '']
    );

    // If registered as a vendor, create an initial vendor profile record
    if (role === 'vendor') {
      await db.query(
        'INSERT INTO vendors (user_id, service_type, portfolio_description, starting_rate) VALUES (?, ?, ?, ?)',
        [result.insertId, 'catering', 'Default portfolio', 0.00]
      );
    }

    res.status(201).json({
      message: 'Registration successful!',
      userId: result.insertId,
      status: initialStatus
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// 2. LOGIN ROUTE
// ==========================================
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // 1. FIRST check: Does this email exist in the database at all?
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      // If the email is not in the database, tell them to register
      return res.status(400).json({ message: 'Account not found. Please register first.' });
    }

    const user = users[0];

    // 2. SECOND check: Did they select the correct portal for their account type?
    if (user.role !== role) {
      // Format the role name nicely (e.g., 'venue_owner' -> 'venue owner')
      const correctPortal = user.role.replace('_', ' ');
      return res.status(400).json({ message: `Incorrect portal. Please log in through the ${correctPortal} tab.` });
    }
    
    // 3. THIRD check: Is the password correct?
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password. Please try again.' });
    }

    // ---> ADMIN APPROVAL CHECK <---
    if (user.status === 'pending') {
      return res.status(403).json({ message: 'Your account is pending admin approval.' });
    }
    if (user.status === 'rejected') {
      return res.status(403).json({ message: 'Your account registration was rejected.' });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send successful response
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

## File: backend/db.js
```javascript
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'event_booking_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
```

## File: backend/event_booking_system.sql
```sql
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 14, 2026 at 10:40 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `event_booking_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `venue_id` int(11) NOT NULL,
  `event_date` date NOT NULL,
  `guest_count` int(11) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `advance_paid` decimal(10,2) DEFAULT 0.00,
  `booking_status` enum('pending','confirmed','cancelled','completed') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `booking_vendors`
--

CREATE TABLE `booking_vendors` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `service_status` enum('pending','accepted','declined','preparing','ready') DEFAULT 'pending',
  `cost` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `sent_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `venue_id` int(11) DEFAULT NULL,
  `vendor_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(120) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','venue_owner','vendor','customer') NOT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `phone` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `status`, `phone`, `created_at`) VALUES
(1, 'Rafiq Hasan', 'rafiq@gmail.com', '$2b$10$g/2e.42cPXFVJUUI8sohxuFoUDnYvSKTGq.ZV7hp/MYsvrzQxEP2u', 'venue_owner', 'approved', '', '2026-09-11 14:15:50');

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `service_type` enum('catering','decoration','photography','other') NOT NULL,
  `portfolio_description` text DEFAULT NULL,
  `starting_rate` decimal(10,2) NOT NULL,
  `image_url` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `venues`
--

CREATE TABLE `venues` (
  `id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(200) NOT NULL,
  `capacity` int(11) NOT NULL,
  `price_per_day` decimal(10,2) NOT NULL,
  `image_url` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_venue_date` (`venue_id`,`event_date`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `booking_vendors`
--
ALTER TABLE `booking_vendors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_id` (`booking_id`),
  ADD KEY `vendor_id` (`vendor_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `venue_id` (`venue_id`),
  ADD KEY `vendor_id` (`vendor_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `venues`
--
ALTER TABLE `venues`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `booking_vendors`
--
ALTER TABLE `booking_vendors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `venues`
--
ALTER TABLE `venues`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`venue_id`) REFERENCES `venues` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `booking_vendors`
--
ALTER TABLE `booking_vendors`
  ADD CONSTRAINT `booking_vendors_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `booking_vendors_ibfk_2` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`venue_id`) REFERENCES `venues` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `vendors`
--
ALTER TABLE `vendors`
  ADD CONSTRAINT `vendors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `venues`
--
ALTER TABLE `venues`
  ADD CONSTRAINT `venues_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
```

## File: frontend/public/favicon.svg
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="46" fill="none" viewBox="0 0 48 46"><path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" style="fill:#863bff;fill:color(display-p3 .5252 .23 1);fill-opacity:1"/><mask id="a" width="48" height="46" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M25.842 44.938c-.664.844-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.183c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.498 0-3.579-1.842-3.579H1.133c-.92 0-1.456-1.04-.92-1.787L9.91.473c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.578 1.842 3.578h11.377c.943 0 1.473 1.088.89 1.832L25.843 44.94z" style="fill:#000;fill-opacity:1"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#ede6ff" rx="5.508" ry="14.704" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -4.47 31.516)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#ede6ff" rx="10.399" ry="29.851" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -39.328 7.883)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#7e14ff" rx="5.508" ry="30.487" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -25.913 -14.639)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -32.644 -3.334)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -34.34 30.47)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#ede6ff" rx="14.072" ry="22.078" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="rotate(93.35 24.506 48.493)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx=".387" cy="8.972" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(39.51 .387 8.972)"/></g><g filter="url(#k)"><ellipse cx="47.523" cy="-6.092" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 47.523 -6.092)"/></g><g filter="url(#l)"><ellipse cx="41.412" cy="6.333" fill="#47bfff" rx="5.971" ry="9.665" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 41.412 6.333)"/></g><g filter="url(#m)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#n)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#o)"><ellipse cx="35.651" cy="29.907" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 35.651 29.907)"/></g><g filter="url(#p)"><ellipse cx="38.418" cy="32.4" fill="#47bfff" rx="5.971" ry="15.297" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 38.418 32.4)"/></g></g><defs><filter id="b" width="60.045" height="41.654" x="-19.77" y="16.149" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-54.613" y="-7.533" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-49.64" y="2.03" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-45.045" y="20.029" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-43.513" y="21.178" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="15.756" y="-17.901" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-27.636" y="-22.853" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="20.116" y="-38.415" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="24.641" y="-11.323" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="8.244" y="-2.416" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="18.713" y="10.588" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter></defs></svg>
```

## File: frontend/public/icons.svg
```xml
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="bluesky-icon" viewBox="0 0 16 17">
    <g clip-path="url(#bluesky-clip)"><path fill="#08060d" d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099"/></g>
    <defs><clipPath id="bluesky-clip"><path fill="#fff" d="M.1.85h15.3v15.3H.1z"/></clipPath></defs>
  </symbol>
  <symbol id="discord-icon" viewBox="0 0 20 19">
    <path fill="#08060d" d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
  </symbol>
  <symbol id="documentation-icon" viewBox="0 0 21 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="m15.5 13.333 1.533 1.322c.645.555.967.833.967 1.178s-.322.623-.967 1.179L15.5 18.333m-3.333-5-1.534 1.322c-.644.555-.966.833-.966 1.178s.322.623.966 1.179l1.534 1.321"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M17.167 10.836v-4.32c0-1.41 0-2.117-.224-2.68-.359-.906-1.118-1.621-2.08-1.96-.599-.21-1.349-.21-2.848-.21-2.623 0-3.935 0-4.983.369-1.684.591-3.013 1.842-3.641 3.428C3 6.449 3 7.684 3 10.154v2.122c0 2.558 0 3.838.706 4.726q.306.383.713.671c.76.536 1.79.64 3.581.66"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M3 10a2.78 2.78 0 0 1 2.778-2.778c.555 0 1.209.097 1.748-.047.48-.129.854-.503.982-.982.145-.54.048-1.194.048-1.749a2.78 2.78 0 0 1 2.777-2.777"/>
  </symbol>
  <symbol id="github-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clip-rule="evenodd"/>
  </symbol>
  <symbol id="social-icon" viewBox="0 0 20 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M12.5 6.667a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M2.5 16.667a5.833 5.833 0 0 1 8.75-5.053m3.837.474.513 1.035c.07.144.257.282.414.309l.93.155c.596.1.736.536.307.965l-.723.73a.64.64 0 0 0-.152.531l.207.903c.164.715-.213.991-.84.618l-.872-.52a.63.63 0 0 0-.577 0l-.872.52c-.624.373-1.003.094-.84-.618l.207-.903a.64.64 0 0 0-.152-.532l-.723-.729c-.426-.43-.289-.864.306-.964l.93-.156a.64.64 0 0 0 .412-.31l.513-1.034c.28-.562.735-.562 1.012 0"/>
  </symbol>
  <symbol id="x-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z" clip-rule="evenodd"/>
  </symbol>
</svg>
```

## File: frontend/src/assets/react.svg
```xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>
```

## File: frontend/src/assets/vite.svg
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="77" height="47" fill="none" aria-labelledby="vite-logo-title" viewBox="0 0 77 47"><title id="vite-logo-title">Vite</title><style>.parenthesis{fill:#000}@media (prefers-color-scheme:dark){.parenthesis{fill:#fff}}</style><path fill="#9135ff" d="M40.151 45.71c-.663.844-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.493c-.92 0-1.457-1.04-.92-1.788l7.479-10.471c1.07-1.498 0-3.578-1.842-3.578H15.443c-.92 0-1.456-1.04-.92-1.788l9.696-13.576c.213-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.472c-1.07 1.497 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.087.89 1.83L40.153 45.712z"/><mask id="a" width="48" height="47" x="14" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M40.047 45.71c-.663.843-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.389c-.92 0-1.457-1.04-.92-1.788l7.479-10.472c1.07-1.497 0-3.578-1.842-3.578H15.34c-.92 0-1.456-1.04-.92-1.788l9.696-13.575c.213-.297.556-.474.92-.474H53.93c.92 0 1.456 1.04.92 1.788L47.37 13.03c-1.07 1.498 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.088.89 1.831L40.049 45.712z"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#eee6ff" rx="5.508" ry="14.704" transform="rotate(269.814 20.96 11.29)scale(-1 1)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#eee6ff" rx="10.399" ry="29.851" transform="rotate(89.814 -16.902 -8.275)scale(1 -1)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#8900ff" rx="5.508" ry="30.487" transform="rotate(89.814 -19.197 -7.127)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.928 4.177)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.738 5.52)scale(1 -1)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#eee6ff" rx="14.072" ry="22.078" transform="rotate(93.35 31.245 55.578)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx="14.592" cy="9.743" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(39.51 14.592 9.743)"/></g><g filter="url(#k)"><ellipse cx="61.728" cy="-5.321" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 61.728 -5.32)"/></g><g filter="url(#l)"><ellipse cx="55.618" cy="7.104" fill="#00c2ff" rx="5.971" ry="9.665" transform="rotate(37.892 55.618 7.104)"/></g><g filter="url(#m)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#n)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#o)"><ellipse cx="49.857" cy="30.678" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 49.857 30.678)"/></g><g filter="url(#p)"><ellipse cx="52.623" cy="33.171" fill="#00c2ff" rx="5.971" ry="15.297" transform="rotate(37.892 52.623 33.17)"/></g></g><path d="M6.919 0c-9.198 13.166-9.252 33.575 0 46.789h6.215c-9.25-13.214-9.196-33.623 0-46.789zm62.424 0h-6.215c9.198 13.166 9.252 33.575 0 46.789h6.215c9.25-13.214 9.196-33.623 0-46.789" class="parenthesis"/><defs><filter id="b" width="60.045" height="41.654" x="-5.564" y="16.92" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-40.407" y="-6.762" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-35.435" y="2.801" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-30.84" y="20.8" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-29.307" y="21.949" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="29.961" y="-17.13" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-13.43" y="-22.082" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="34.321" y="-37.644" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="38.847" y="-10.552" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="22.45" y="-1.645" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="32.919" y="11.36" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter></defs></svg>
```

## File: frontend/src/pages/Packages.jsx
```javascript
import { CheckCircle2, Crown } from 'lucide-react';

export default function Packages() {
  const packages = [
    {
      name: 'Silver Bundle',
      price: '$2,500',
      desc: 'Perfect for small gatherings and corporate seminars.',
      features: ['Venue access for 6 hours', 'Basic audio/visual equipment', 'Standard catering (50 guests)', 'Dedicated event manager'],
      color: 'bg-white',
      border: 'border-transparent',
      btn: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      textColor: 'text-gray-900',
      descColor: 'text-gray-500'
    },
    {
      name: 'Gold Wedding',
      price: '$5,800',
      desc: 'The ultimate all-inclusive wedding experience.',
      features: ['Full day venue access (12 hrs)', 'Premium decor & floral setup', 'Gourmet catering (150 guests)', 'Professional photography suite', 'Bridal suite access'],
      color: 'bg-indigo-900',
      border: 'border-indigo-400/30 ring-8 ring-indigo-900/20 border-2',
      btn: 'bg-white text-indigo-900 hover:bg-gray-50',
      textColor: 'text-white',
      descColor: 'text-indigo-200',
      popular: true
    },
    {
      name: 'Platinum Corporate',
      price: '$8,200',
      desc: 'High-end setup for major corporate galas and launches.',
      features: ['Multi-hall access', 'Advanced stage & lighting tech', 'Executive catering (300 guests)', 'Valet parking service', 'Custom branding setup'],
      color: 'bg-white',
      border: 'border-transparent',
      btn: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      textColor: 'text-gray-900',
      descColor: 'text-gray-500'
    }
  ];

  return (
    <div className="min-h-screen relative py-20 flex items-center">
      
      {/* Fixed Dark Elegant Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2500")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gray-900/75 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-lg">
            All-Inclusive <span className="text-indigo-400">Packages</span>
          </h1>
          <p className="text-lg text-gray-300 font-medium drop-shadow-md">
            Save time and money by booking a venue combined with our top-rated vendor services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {packages.map((pkg, idx) => (
            <div key={idx} className={`relative rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:-translate-y-2 ${pkg.color} ${pkg.border}`}>
              
              {pkg.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-5 py-1.5 rounded-full text-xs font-black tracking-widest uppercase flex items-center shadow-lg">
                  <Crown className="w-4 h-4 mr-1.5" /> Most Popular
                </div>
              )}
              
              <h3 className={`text-2xl font-black mb-2 ${pkg.textColor}`}>{pkg.name}</h3>
              <p className={`text-sm mb-6 ${pkg.descColor}`}>{pkg.desc}</p>
              
              <div className={`text-4xl font-black mb-8 ${pkg.textColor}`}>
                {pkg.price} <span className={`text-lg font-medium ${pkg.popular ? 'text-indigo-300' : 'text-gray-400'}`}>/ event</span>
              </div>
              
              <ul className="space-y-4 mb-8 min-h-[220px]">
                {pkg.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start">
                    <CheckCircle2 className={`w-5 h-5 mr-3 shrink-0 ${pkg.popular ? 'text-indigo-300' : 'text-indigo-600'}`} />
                    <span className={`text-sm font-semibold ${pkg.popular ? 'text-indigo-50' : 'text-gray-700'}`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all shadow-md ${pkg.btn}`}>
                Select Package
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## File: frontend/src/pages/register.jsx
```javascript
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, MapPin, Camera } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'customer'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      if (formData.role === 'customer') {
        setSuccess('Account created! Redirecting to login...');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setSuccess('Registration submitted! Please wait for Admin approval.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const roles = [
    { id: 'customer', title: 'Customer', icon: User, desc: 'Book venues & vendors' },
    { id: 'venue_owner', title: 'Venue Owner', icon: MapPin, desc: 'List your spaces' },
    { id: 'vendor', title: 'Vendor', icon: Camera, desc: 'Offer your services' }
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      
      {/* Left Side - Original Background Image with Blur */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2500" 
          alt="Luxury Event Venue" 
          /* The blur and scale are applied here to your original image */
          className="absolute inset-0 w-full h-full object-cover blur-[3px] scale-105 opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-gray-900/70 z-10" />
        
        <div className="relative z-20 text-white p-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-black mb-6 drop-shadow-xl tracking-tight">Elevate Every Event</h2>
          <p className="text-lg font-medium text-gray-200 drop-shadow-md max-w-md mx-auto">
            Join our platform to book stunning venues, hire top-tier vendors, and manage your events seamlessly.
          </p>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900">Create Account</h2>
            <p className="text-gray-500 mt-2 font-medium">Choose your account type to get started</p>
          </div>

          {error && <div className="p-3 mb-4 text-sm font-semibold bg-red-50 text-red-600 rounded-lg border border-red-100">{error}</div>}
          {success && <div className="p-3 mb-4 text-sm font-semibold bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-3 gap-3 mb-6">
              {roles.map((r) => {
                const Icon = r.icon;
                const isActive = formData.role === r.id;
                return (
                  <button
                    type="button"
                    key={r.id}
                    onClick={() => setFormData({ ...formData, role: r.id })}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 ${
                      isActive 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' 
                        : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50 text-gray-500'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-1.5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                    <span className="text-[10px] font-black uppercase tracking-wider">{r.title}</span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-gray-700 uppercase mb-1.5 tracking-wider ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                  placeholder="e.g. John Doe"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-700 uppercase mb-1.5 tracking-wider ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                  placeholder="name@example.com"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-700 uppercase mb-1.5 tracking-wider ml-1">Password</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
            >
              Sign Up as {roles.find(r => r.id === formData.role)?.title}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 font-bold hover:underline transition-all">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
```

## File: frontend/src/pages/Vendor.jsx
```javascript
import { useState } from 'react';
import { Camera, Utensils, Palette, Star, MapPin } from 'lucide-react';

export default function Vendor() {
  // Added state to track which category is currently clicked
  const [activeCategory, setActiveCategory] = useState('All Vendors');

  const vendors = [
    // 4 Catering
    { name: 'Gourmet Delights', type: 'Catering', icon: Utensils, rating: 4.9, price: 'From $25/plate', img: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop' },
    { name: 'Urban Feast', type: 'Catering', icon: Utensils, rating: 4.7, price: 'From $18/plate', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop' },
    { name: 'Savory & Sweet', type: 'Catering', icon: Utensils, rating: 4.8, price: 'From $30/plate', img: 'https://images.unsplash.com/photo-1555243896-c709bfa0b564?q=80&w=800&auto=format&fit=crop' },
    { name: 'Global Bites', type: 'Catering', icon: Utensils, rating: 4.9, price: 'From $22/plate', img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=800&auto=format&fit=crop' },
    
    // 4 Photography
    { name: 'Lens & Light Pro', type: 'Photography', icon: Camera, rating: 4.8, price: 'From $500/day', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop' },
    { name: 'Cinematic Memories', type: 'Photography', icon: Camera, rating: 4.9, price: 'From $600/day', img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop' },
    { name: 'Aperture Studios', type: 'Photography', icon: Camera, rating: 4.6, price: 'From $450/day', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop' },
    { name: 'Candid Moments', type: 'Photography', icon: Camera, rating: 4.8, price: 'From $550/day', img: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop' },
    
    // 4 Decoration
    { name: 'Elegant Blooms', type: 'Decoration', icon: Palette, rating: 5.0, price: 'From $800/event', img: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800&auto=format&fit=crop' },
    { name: 'Luxe Aesthetics', type: 'Decoration', icon: Palette, rating: 4.7, price: 'From $1,200/event', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop' },
    { name: 'Floral Symphonies', type: 'Decoration', icon: Palette, rating: 5.0, price: 'From $950/event', img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop' },
    { name: 'Vintage Charm', type: 'Decoration', icon: Palette, rating: 4.7, price: 'From $700/event', img: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop' },
  ];

  // Logic to filter the vendors based on the clicked button
  const filteredVendors = activeCategory === 'All Vendors' 
    ? vendors 
    : vendors.filter(vendor => vendor.type === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      
      {/* Bulletproof CSS Background Hero Section */}
      <div 
        className="relative pt-32 pb-40 flex items-center justify-center mb-16 shadow-sm"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gray-900/40"></div>
        
        <div className="relative z-10 text-center px-4 w-full max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-lg tracking-tight">
            Top-Tier Event Vendors
          </h1>
          <p className="text-lg text-gray-100 font-medium drop-shadow-md">
            Browse verified photographers, caterers, and decorators to make your event truly unforgettable.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Functional Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['All Vendors', 'Photography', 'Catering', 'Decoration'].map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat 
                  ? 'bg-gray-900 text-white shadow-md' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-gray-900 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Vendor Grid rendering the filtered list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredVendors.map((vendor, index) => {
            const Icon = vendor.icon;
            return (
              <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col">
                <div className="h-52 overflow-hidden relative bg-gray-100">
                  <img src={vendor.img} alt={vendor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm text-gray-900">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> {vendor.rating}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-3 bg-indigo-50 w-max px-2.5 py-1 rounded-md">
                    <Icon className="w-3.5 h-3.5" /> {vendor.type}
                  </div>
                  <h3 className="font-black text-xl text-gray-900 mb-2">{vendor.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm mb-6 font-medium">
                    <MapPin className="w-4 h-4 mr-1.5 text-gray-400" /> Available Nationwide
                  </div>
                  <div className="mt-auto pt-5 border-t border-gray-100 flex justify-between items-center">
                    <span className="font-black text-gray-900 text-lg">{vendor.price}</span>
                    <button className="text-sm font-bold text-gray-900 hover:text-indigo-600 transition-colors">Profile &rarr;</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Fallback if a category is empty (though ours are full) */}
        {filteredVendors.length === 0 && (
          <div className="text-center py-12 text-gray-500 font-medium">
            No vendors found for this category.
          </div>
        )}

      </div>
    </div>
  );
}
```

## File: frontend/src/App.css
```css
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}
```

## File: frontend/src/index.css
```css
@import "tailwindcss";
```

## File: frontend/src/main.jsx
```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

## File: frontend/.gitignore
```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

## File: frontend/.oxlintrc.json
```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

## File: frontend/index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>frontend</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## File: frontend/package.json
```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "lucide-react": "^1.44.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-router-dom": "^7.18.3",
    "tailwindcss": "^4.3.3"
  },
  "devDependencies": {
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@vitejs/plugin-react": "^6.1.1",
    "oxlint": "^1.81.0",
    "vite": "^8.3.0"
  }
}
```

## File: frontend/README.md
```markdown
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
```

## File: frontend/vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

## File: README.md
```markdown
# Event-Vanue-Vendor-Bokking-System
```

## File: backend/package.json
```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "bcrypt": "^6.0.0",
    "bcryptjs": "^3.0.3",
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.10.0",
    "mysql2": "^3.24.4"
  }
}
```

## File: backend/server.js
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

// 1. Import your dedicated route files
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoute');

const app = express();

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Connect the routes to the Express app
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// 4. Health check endpoint (Great for testing if the DB is connected!)
app.get('/api/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ status: 'success', message: 'Backend connected to MySQL successfully!' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// 5. Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
```

## File: frontend/src/pages/AdminDashboard.jsx
```javascript
import { useState, useEffect } from 'react';
import { ShieldCheck, Users, Building, Settings, LogOut, Check, X, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('approvals');
  const [pendingUsers, setPendingUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // 1. FETCH REAL DATA: Pull pending users from your database when the page loads
  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/pending-users', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        
        if (response.ok) {
          const data = await response.json();
          setPendingUsers(data);
        } else {
          console.error("Failed to fetch real users. Make sure your backend route exists!");
          // Fallback to dummy data ONLY if the backend isn't ready yet
          setPendingUsers([
            { id: '1', name: 'Rafiq Hasan (Mock)', email: 'rafiq@gmail.com', role: 'venue_owner', createdAt: 'Sept 11, 2026' }
          ]);
        }
      } catch (error) {
        console.error("Backend offline. Loading mock data.", error);
        setPendingUsers([
          { id: '1', name: 'Rafiq Hasan (Mock)', email: 'rafiq@gmail.com', role: 'venue_owner', createdAt: 'Sept 11, 2026' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // 2. SEND REAL APPROVAL: Tell the database to update the user's status
  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/approve-user/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
      });

      if (response.ok) {
        // Remove the user from the screen only if the database successfully updated
        setPendingUsers(pendingUsers.filter(user => user.id !== id));
        alert('Success! User has been approved in the database and can now log in.');
      } else {
        alert('Error: Backend route failed or does not exist yet.');
      }
    } catch (error) {
      alert('Error connecting to backend server.');
    }
  };

  // Simulate rejecting a user
  const handleReject = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/reject-user/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (response.ok) {
        setPendingUsers(pendingUsers.filter(user => user.id !== id));
      }
    } catch (error) {
      console.error("Failed to reject user");
    }
  };

  const navItems = [
    { id: 'approvals', label: 'User Approvals', icon: ShieldCheck },
    { id: 'all-users', label: 'Manage Users', icon: Users },
    { id: 'all-venues', label: 'Manage Venues', icon: Building },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <div 
      className="min-h-screen flex relative"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2500")', // Audience in a dark stage looking aside
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Clear Dark Gradient Overlay matching Venue Dashboard */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/50 to-gray-900/80 z-0"></div>

      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#fffdf8]/95 backdrop-blur-xl border-r border-white/40 flex flex-col fixed h-full z-20 shadow-2xl">
        <div className="p-6 border-b border-white/40 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tight">EventHub <span className="text-indigo-600 font-bold text-sm">Admin</span></span>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm' 
                    : 'text-gray-500 hover:bg-white/50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                {item.label}
                {item.id === 'approvals' && pendingUsers.length > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                    {pendingUsers.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/40">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-10 relative z-10">
        <header className="mb-10 relative z-10">
          <h1 className="text-3xl font-black text-white capitalize drop-shadow-md">{activeTab.replace('-', ' ')}</h1>
          <p className="text-gray-300 font-medium mt-1 drop-shadow">Platform management and administration.</p>
        </header>

        {activeTab === 'approvals' && (
          <div className="space-y-8">
            {/* Glassmorphic Admin Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Registered Users', count: '1,248', icon: Users, trend: '+12% this week', color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'System Venues', count: '42', icon: Building, trend: '+3 new', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { label: 'Pending Approvals', count: pendingUsers.length, icon: ShieldCheck, trend: 'Requires action', color: 'text-amber-600', bg: 'bg-amber-50' }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-[#fffdf8]/95 backdrop-blur-xl p-6 rounded-3xl border border-white/40 shadow-2xl flex flex-col justify-between hover:-translate-y-1 transition-transform">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${stat.bg} shadow-inner`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <span className="text-xs font-bold text-gray-500 bg-white/50 border border-gray-100 px-3 py-1 rounded-full shadow-sm">{stat.trend}</span>
                    </div>
                    <div>
                      <span className="text-3xl font-black text-gray-900">{stat.count}</span>
                      <p className="text-sm font-bold text-gray-500 mt-1">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Main Approvals Table */}
            <div className="bg-[#fffdf8]/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-white/40 flex items-center justify-between bg-white/50">
              <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                Access Requests
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                    <th className="p-6 font-black">User Details</th>
                    <th className="p-6 font-black">Requested Role</th>
                    <th className="p-6 font-black">Date Applied</th>
                    <th className="p-6 font-black text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {isLoading ? (
                    <tr><td colSpan="4" className="p-12 text-center text-gray-400 font-bold">Loading accounts...</td></tr>
                  ) : pendingUsers.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="p-12 text-center text-gray-400 font-bold">
                        No pending approvals at this time.
                      </td>
                    </tr>
                  ) : (
                    pendingUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-6">
                          <p className="font-bold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </td>
                        <td className="p-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                            user.role === 'venue_owner' 
                              ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                              : 'bg-purple-50 text-purple-700 border border-purple-100'
                          }`}>
                            {user.role ? user.role.replace('_', ' ') : 'Unknown'}
                          </span>
                        </td>
                        <td className="p-6 text-sm font-medium text-gray-500">
                          {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleReject(user.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors tooltip"
                              title="Reject"
                            >
                              <X className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleApprove(user.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-sm font-bold rounded-lg transition-all active:scale-95"
                            >
                              <Check className="w-4 h-4" />
                              Approve
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          </div>
        )}
      </main>
    </div>
  );
}
```

## File: frontend/src/pages/logIn.jsx
```javascript
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, User, MapPin, Camera } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'customer' // Default role
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      // This line catches the 403 "pending approval" error from your backend!
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Route actors to their specific dashboards based on the selected role
      if (formData.role === 'vendor') navigate('/vendor-dashboard');
      else if (formData.role === 'venue_owner') navigate('/venue-dashboard');
      else navigate('/'); 

    } catch (err) {
      // This displays the error on the screen
      setError(err.message);
    }
  };

  const roles = [
    { id: 'customer', title: 'Customer', icon: User },
    { id: 'venue_owner', title: 'Venue Owner', icon: MapPin },
    { id: 'vendor', title: 'Vendor', icon: Camera }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] relative flex items-center justify-center p-4">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1561501878-aabd62634533?auto=format&fit=crop&q=80&w=2500" 
          alt="Event Lights" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-black text-gray-900">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-2 font-medium">Select your portal and sign in</p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="p-3 mb-6 text-sm font-semibold bg-red-50 text-red-600 rounded-xl border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Role Selector */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {roles.map((r) => {
              const Icon = r.icon;
              const isActive = formData.role === r.id;
              return (
                <button
                  type="button"
                  key={r.id}
                  onClick={() => setFormData({ ...formData, role: r.id })}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 ${
                    isActive 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' 
                      : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50 text-gray-500'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-1.5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                  <span className="text-[10px] font-black uppercase tracking-wider">{r.title}</span>
                </button>
              );
            })}
          </div>

          <div>
            <label className="block text-xs font-black text-gray-700 uppercase mb-1.5 tracking-wider ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-gray-700 uppercase mb-1.5 tracking-wider ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full group flex items-center justify-center gap-2 py-4 mt-2 bg-gray-900 hover:bg-indigo-600 text-white font-bold text-sm rounded-xl shadow-lg transition-all active:scale-[0.98]"
          >
            Sign In as {roles.find(r => r.id === formData.role)?.title}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8 font-medium">
          New to EventHub?{' '}
          <Link to="/register" className="text-indigo-600 font-bold hover:underline transition-all">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
```

## File: frontend/src/pages/VenueDashboard.jsx
```javascript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building, LayoutDashboard, CalendarCheck, Settings, 
  Plus, MoreVertical, LogOut, User, Bell, TrendingUp, Users, DollarSign 
} from 'lucide-react';

export default function VenueDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Retrieve user data to display their actual name
  const storedUser = JSON.parse(localStorage.getItem('user')) || { name: 'Rafiq Hasan' };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'my-venues', label: 'My Venues', icon: Building },
    { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div 
      className="min-h-screen flex relative"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2500")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Clear Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/50 to-gray-900/80 z-0"></div>
      
      {/* 1. SIDEBAR */}
      <aside className="w-64 bg-[#fffdf8]/95 backdrop-blur-xl border-r border-white/40 flex flex-col fixed h-full z-20 shadow-2xl">
        <div className="p-6 border-b border-white/40 flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
            <Building className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tight">EventHub <span className="text-indigo-600 font-bold text-sm">{storedUser.name}</span></span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive 
                    ? 'bg-indigo-100/50 text-indigo-700 border border-indigo-200' 
                    : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen relative z-10">
        
        {/* DASHBOARD TOP HEADER */}
        <header className="h-20 bg-[#fffdf8]/95 backdrop-blur-md border-b border-white/40 px-10 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          
          {/* --- UPDATED: Colorful Welcome Greeting --- */}
          <div>
            {activeTab === 'overview' ? (
              <h2 className="text-2xl font-black text-gray-900">
                Welcome, <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">{storedUser.name}</span> 👋
              </h2>
            ) : (
              <h2 className="text-xl font-black text-gray-900 capitalize">{activeTab.replace('-', ' ')}</h2>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-all">
              <Bell className="w-5 h-5" />
            </button>
            
            <div className="h-8 w-px bg-gray-200"></div>

            {/* User Profile & 3-Dot Menu */}
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 p-1.5 pr-2 hover:bg-white/60 rounded-full transition-all border border-transparent hover:border-white/50"
              >
                <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center border border-indigo-200">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>

              {/* Dropdown Box */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#fffdf8]/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/40 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-white/40 mb-1">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Account</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white/60 hover:text-indigo-600 flex items-center gap-2">
                    <User className="w-4 h-4" /> Profile Settings
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 mt-1"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="p-8">
          {/* Header */}
          {activeTab === 'overview' && (
            <header className="flex justify-between items-end mb-10">
              <div>
                <h1 className="text-3xl font-black text-white drop-shadow-md">Overview</h1>
                <p className="text-gray-300 font-medium mt-1 drop-shadow">Manage your properties and incoming requests.</p>
              </div>
              
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Venue
              </button>
            </header>
          )}

          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Quick Stats Widgets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Total Revenue', value: '$12,450', icon: DollarSign, trend: '+14%' },
                  { title: 'Active Bookings', value: '24', icon: CalendarCheck, trend: '+5%' },
                  { title: 'Total Guests Hosted', value: '1,204', icon: Users, trend: '+22%' },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="bg-[#fffdf8]/95 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-2xl hover:-translate-y-1 transition-transform flex items-center gap-5">
                      <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-100">
                        <Icon className="w-7 h-7 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-1">{stat.title}</p>
                        <div className="flex items-end gap-3">
                          <span className="text-2xl font-black text-gray-900">{stat.value}</span>
                          <span className="text-xs font-bold text-emerald-500 mb-1 flex items-center"><TrendingUp className="w-3 h-3 mr-1"/>{stat.trend}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Placeholder for Recent Bookings Table */}
              <div className="bg-[#fffdf8]/95 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-8">
                <h3 className="text-lg font-black text-gray-900 mb-6">Recent Booking Requests</h3>
                <div className="flex items-center justify-center py-12 border-2 border-dashed border-white/40 rounded-2xl bg-white/30">
                  <p className="text-sm font-bold text-gray-500">No new booking requests this week.</p>
                </div>
              </div>
            </div>
          )}

          {/* Placeholders for other tabs */}
          {activeTab !== 'overview' && (
            <div className="bg-[#fffdf8]/95 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-8 flex items-center justify-center min-h-[400px]">
              <p className="text-gray-500 font-bold capitalize">{activeTab.replace('-', ' ')} Management Grid will go here.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
```

## File: frontend/src/App.jsx
```javascript
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Search, CalendarDays, Users, Wallet, Star, MapPin } from 'lucide-react';
import Navbar from './component/Navbar';
import Login from './pages/logIn';
import Register from './pages/register';
import Vendor from './pages/Vendor';
import Packages from './pages/Packages';
import AdminDashboard from './pages/AdminDashboard';
import VenueDashboard from './pages/VenueDashboard';

function Home() {
  const featuredVenues = [
    { name: 'Grand Plaza Resort', loc: 'Downtown City Center', price: '$1,200', cap: 'Up to 500 Guests', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop' },
    { name: 'The Glass House', loc: 'Riverside District', price: '$2,500', cap: 'Up to 300 Guests', img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=600&auto=format&fit=crop' },
    { name: 'Heritage Banquet', loc: 'Old Town Square', price: '$850', cap: 'Up to 200 Guests', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop' },
    { name: 'Crystal Pavilion', loc: 'Uptown Business Park', price: '$3,200', cap: 'Up to 1000 Guests', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop' },
    { name: 'Sapphire Lounge', loc: 'Westside Marina', price: '$950', cap: 'Up to 150 Guests', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop' },
    { name: 'Emerald Estate', loc: 'Outskirts Countryside', price: '$1,800', cap: 'Up to 400 Guests', img: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=600&auto=format&fit=crop' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Premium CSS Background Hero Section */}
      <div className="relative pt-32 pb-40 lg:pt-48 lg:pb-56 flex items-center justify-center shadow-lg">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1561501878-aabd62634533?auto=format&fit=crop&q=80&w=2500")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/50 to-gray-900/80"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-2xl">
            Find the Perfect Space <br className="hidden md:block"/> for Your <span className="text-indigo-400">Dream Event</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-12 drop-shadow-md font-medium">
            From majestic banquet halls to professional corporate spaces. Book venues and top-tier vendors all in one place.
          </p>

          {/* Premium Floating Search Bar */}
          <div className="bg-white p-2 md:p-3 rounded-2xl md:rounded-full shadow-2xl max-w-5xl mx-auto flex flex-col md:flex-row gap-2 border border-white/20">
            <div className="flex-1 flex items-center px-4 py-3 md:py-2 md:border-r border-gray-100 hover:bg-gray-50 rounded-full transition-colors cursor-text">
              <CalendarDays className="w-5 h-5 text-indigo-500 mr-3 shrink-0" />
              <div className="flex flex-col text-left w-full overflow-hidden">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">Event Date</span>
                {/* Fixed the mm/dd/yyyy issue with onFocus trick */}
                <input 
                  type="text" 
                  placeholder="Select a date"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = e.target.value ? "date" : "text")}
                  className="bg-transparent w-full outline-none text-sm text-gray-900 font-medium cursor-pointer" 
                />
              </div>
            </div>
            
            <div className="flex-1 flex items-center px-4 py-3 md:py-2 md:border-r border-gray-100 hover:bg-gray-50 rounded-full transition-colors cursor-text">
              <Users className="w-5 h-5 text-indigo-500 mr-3 shrink-0" />
              <div className="flex flex-col text-left w-full">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">Guests</span>
                <input type="number" placeholder="Add capacity" className="bg-transparent w-full outline-none text-sm text-gray-900 font-medium" />
              </div>
            </div>
            
            <div className="flex-1 flex items-center px-4 py-3 md:py-2 hover:bg-gray-50 rounded-full transition-colors">
              <Wallet className="w-5 h-5 text-indigo-500 mr-3 shrink-0" />
              <div className="flex flex-col text-left w-full">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">Budget</span>
                <select className="bg-transparent w-full outline-none text-sm text-gray-900 font-medium appearance-none cursor-pointer">
                  <option value="">Any Budget</option>
                  <option value="low">Under $1,000</option>
                  <option value="med">$1,000 - $5,000</option>
                  <option value="high">$5,000+</option>
                </select>
              </div>
            </div>
            
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 md:py-0 md:h-14 rounded-xl md:rounded-full font-bold transition-all shadow-lg shadow-indigo-200 flex items-center justify-center min-w-[140px]">
              <Search className="w-5 h-5 mr-2" />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Featured Venues Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Featured Venues</h2>
            <p className="text-gray-500 mt-2 text-lg">Highly rated spaces for your next gathering.</p>
          </div>
          <Link to="/venues" className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors flex items-center">
            Explore all spaces <span className="ml-2">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredVenues.map((venue, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col">
              <div className="h-56 overflow-hidden relative">
                <img src={venue.img} alt={venue.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-2.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> 4.9
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-black text-xl text-gray-900">{venue.name}</h3>
                <div className="flex items-center text-gray-500 text-sm mt-2 mb-6">
                  <MapPin className="w-4 h-4 mr-1 text-gray-400" /> {venue.loc}
                </div>
                <div className="mt-auto pt-5 border-t border-gray-100 flex justify-between items-center">
                  <div>
                    <span className="font-black text-gray-900 text-xl">{venue.price}</span>
                    <span className="text-gray-500 text-sm font-medium"> / day</span>
                  </div>
                  <div className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg">
                    {venue.cap}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- NEW ROUTING LOGIC STARTS HERE ---

// 1. Create a Layout component to read the URL and hide the Navbar
function Layout() {
  const location = useLocation();
  
  // If the URL contains "dashboard", this will be true
  const isDashboard = location.pathname.includes('-dashboard');

  return (
    <div className="min-h-screen bg-white">
      {/* 2. Only render Navbar if we are NOT on a dashboard */}
      {!isDashboard && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vendors" element={<Vendor />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/venue-dashboard" element={<VenueDashboard />} />
      </Routes>
    </div>
  );
}

// 3. Keep App as the main wrapper for the Router
export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
```

## File: frontend/src/component/Navbar.jsx
```javascript
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Dynamically determine the correct dashboard path based on the user's role
  const getDashboardPath = (role) => {
    if (!role) return '/';
    switch (role) {
      case 'venue_owner': return '/venue-dashboard';
      case 'vendor': return '/vendor-dashboard';
      case 'admin': return '/admin-dashboard';
      default: return '/customer-dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-indigo-600 font-black text-xl tracking-tight hover:opacity-80 transition-opacity">
          <Calendar className="w-6 h-6 stroke-[2.5]" />
          <span>Event<span className="text-gray-900">Hub</span></span>
        </Link>

        {/* Public Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Venues</Link>
          <Link to="/vendors" className="hover:text-indigo-600 transition-colors">Vendors</Link>
          <Link to="/packages" className="hover:text-indigo-600 transition-colors">Packages</Link>
          <Link to="/admin-dashboard" className="hover:text-indigo-600 transition-colors font-black text-indigo-500">Admin</Link>
        </nav>

        {/* User / Auth Controls */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              {/* Dynamic Dashboard Button */}
              <Link 
                to={getDashboardPath(user.role)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                My Dashboard
              </Link>
              
              <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

              {/* Logout Button */}
              <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" 
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200 transition-all active:scale-95"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
        
      </div>
    </header>
  );
}
```
