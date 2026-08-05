const app = express();

// ==========================
// Global Middleware
// ==========================

app.use(cors());
app.use(express.json());
app.use(logger);