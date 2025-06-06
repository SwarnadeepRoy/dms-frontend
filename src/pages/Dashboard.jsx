import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  FileText, 
  Folder, 
  Upload, 
  Share2, 
  Trash2, 
  Download,
  MoreVertical,
  Plus,
  HardDrive,
  Users,
  Clock,
  File,
  Search,
  Menu,
  X
} from 'lucide-react';

// Mock data
const documents = [
  {
    id: 1,
    name: 'Q1-Report-2025.pdf',
    type: 'PDF',
    size: '2.4 MB',
    modified: '2 hours ago',
    shared: false
  },
  {
    id: 2,
    name: 'Project-Proposal.docx',
    type: 'DOCX',
    size: '1.8 MB',
    modified: '1 day ago',
    shared: true
  },
  {
    id: 3,
    name: 'Budget-Summary.xlsx',
    type: 'XLSX',
    size: '3.1 MB',
    modified: '3 days ago',
    shared: false
  },
  {
    id: 4,
    name: 'Team-Photo.jpg',
    type: 'JPG',
    size: '4.2 MB',
    modified: '1 week ago',
    shared: true
  }
];

const metrics = [
  { 
    title: 'Total Documents', 
    value: '1,248', 
    icon: <FileText className="h-5 w-5 text-indigo-600" />,
    change: '+12% from last month'
  },
  { 
    title: 'Storage Used', 
    value: '4.2 GB / 10 GB', 
    icon: <HardDrive className="h-5 w-5 text-emerald-600" />,
    change: '42% of total'
  },
  { 
    title: 'Shared Files', 
    value: '87', 
    icon: <Share2 className="h-5 w-5 text-amber-600" />,
    change: '+5 this week'
  },
  { 
    title: 'Recent Activity', 
    value: '24', 
    icon: <Clock className="h-5 w-5 text-rose-600" />,
    change: 'Today'
  }
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <div className="flex items-center">
            <Folder className="h-6 w-6 text-indigo-600" />
            <span className="ml-2 text-xl font-bold">Vault</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {[
            { name: 'Dashboard', icon: <FileText className="h-5 w-5" />, current: true },
            { name: 'My Documents', icon: <Folder className="h-5 w-5" />, current: false },
            { name: 'Shared', icon: <Share2 className="h-5 w-5" />, current: false },
            { name: 'Recent', icon: <Clock className="h-5 w-5" />, current: false },
            { name: 'Trash', icon: <Trash2 className="h-5 w-5" />, current: false },
          ].map((item) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                item.current
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-gray-700 dark:text-white'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 md:ml-64">
        {/* Topbar */}
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="relative ml-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search documents..."
                  className="pl-10 w-64 bg-gray-50 dark:bg-gray-700 border-0 focus-visible:ring-2 focus-visible:ring-indigo-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Welcome Banner */}
          <Card className="mb-6 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back, Alex!
              </CardTitle>
              <CardDescription className="text-gray-700 dark:text-gray-300">
                Here's what's happening with your documents today.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload New Document
              </Button>
            </CardContent>
          </Card>

          {/* Metrics Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {metrics.map((metric, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {metric.title}
                  </CardTitle>
                  <div className="p-2 rounded-md bg-indigo-100 dark:bg-indigo-900/30">
                    {metric.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metric.value}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                    {metric.change}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Documents and Quick Actions */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Recent Documents */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Documents</span>
                  <Button variant="ghost" size="sm" className="text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-gray-700">
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Last Modified</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium flex items-center text-gray-800 dark:text-gray-200">
                            <FileText className="h-5 w-5 text-indigo-600 mr-2" />
                            {doc.name}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600">
                              {doc.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                            {doc.modified}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                  <span className="sr-only">Open menu</span>
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                <DropdownMenuItem className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                  <Share2 className="mr-2 h-4 w-4" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Files
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Folder className="mr-2 h-4 w-4" />
                    Create Folder
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Document
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Team
                  </Button>
                </CardContent>
              </Card>

              {/* Storage Usage */}
              <Card>
                <CardHeader>
                  <CardTitle>Storage Usage</CardTitle>
                  <CardDescription>4.2 GB of 10 GB used</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-2.5 w-full bg-gray-200 rounded-full dark:bg-gray-700">
                    <div 
                      className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500" 
                      style={{ width: '42%' }}
                    ></div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Used</div>
                      <div className="font-medium">4.2 GB</div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-500 dark:text-gray-400">Available</div>
                      <div className="font-medium">5.8 GB</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;