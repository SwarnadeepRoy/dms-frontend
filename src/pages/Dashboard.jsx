import React, { useEffect, useState, useMemo } from "react";
import {
    FileText,
    Folder,
    Share2,
    Trash2,
    Upload,
    Download,
    MoreVertical,
    Clock,
    HardDrive,
    Users,
    ChevronLeft,
    ChevronRight,
    Menu,
    X,
} from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";


const metrics = [
    {
        title: "Total Documents",
        value: "10",
        icon: <FileText className="h-5 w-5 text-indigo-600" />,
        change: "+12% from last month",
    },
    {
        title: "Storage Used",
        value: "100 MB / 1 GB",
        icon: <HardDrive className="h-5 w-5 text-emerald-600" />,
        change: "10% of total",
    },
    {
        title: "Shared Files",
        value: "2",
        icon: <Share2 className="h-5 w-5 text-amber-600" />,
        change: "+2 this week",
    },
    {
        title: "Recent Activity",
        value: "24",
        icon: <Clock className="h-5 w-5 text-rose-600" />,
        change: "Today",
    },
];

const navItems = [
    { name: "Dashboard", icon: FileText },
    { name: "My Documents", icon: Folder },
    { name: "Shared", icon: Share2 },
    { name: "Recent", icon: Clock },
    { name: "Trash", icon: Trash2 },
];

const Dashboard = () => {

    const { user } = useUser();
    const firstName = user?.firstName || "User";
    // console.log(user);

    const [userId, setUserId] = useState(null);
    const [selectedPage, setSelectedPage] = useState("Dashboard");
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [documents, setDocuments] = useState([]);

    const mockDocuments = [
        {
            id: 1,
            name: "Q1-Report-2025.whiteboard",
            type: "whiteboard",
            url: "https://tldraww-whiteboard.vercel.app/",
            size: "2.4 MB",
            modified: "2 hours ago",
            shared: false,
        },
        {
            id: 2,
            name: "Project-Proposal.docx",
            type: "DOCX",
            url: `http://collaborative-text-editor-six.vercel.app?fileId=ccfdc52e-5dfa-4f80-b67c-1c1307b1ce7a&userId=${userId}&workspaceId=f2f8cc21-3970-4a25-bf41-918857571645&filename=new-document`,
            size: "1.8 MB",
            modified: "1 day ago",
            shared: true,
        },
        {
            id: 3,
            name: "Budget-Summary.xlsx",
            type: "XLSX",
            url: "http://collaborative-spreadsheet-advanced-opal.vercel.app",
            size: "3.1 MB",
            modified: "3 days ago",
            shared: false,
        },
        {
            id: 4,
            name: "Team-Photo.jpg",
            type: "JPG",
            url: "https://jollycontrarian.com/images/6/6c/Rickroll.jpg",
            size: "4.2 MB",
            modified: "1 week ago",
            shared: true,
        },
    ];
    

    useEffect(() => {
        getDocuments(); // Fetch documents when component mounts
    }, []);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/member/${encodeURIComponent(user.fullName)}`)
            .then(response => {console.log(response.data); return response.data})
            .then(data => setUserId(data[0].user_id))
            .catch(error => {
                console.error("Error fetching documents:", error);
                axios.post(`${import.meta.env.VITE_BACKEND_URL}/members`, {
                    username: user.fullName,
                    email: user.emailAddresses[0].emailAddress,
                    first_name: user.firstName,
                    last_name: user.lastName,
                    is_active: true,
                })
                    .then(response => response.data)
                    .then(data => setUserId(data.user_id))
                    .catch(error => {
                        console.error("Error fetching documents:", error);
                    });
            });
            // console.log(userId);
    }, []);

    const totalBytes = useMemo(() => {
        if (!documents || documents.length === 0) return 0;
        return formatFileSize(documents.reduce((total, doc) => {
            return total + (Number(doc.file_size_bytes) || 0);
        }, 0));
    }, [documents]);

    const totalBytesperc = useMemo(() => {
        if (!documents || documents.length === 0) return 0;
        return documents.reduce((total, doc) => {
            return total + (Number(doc.file_size_bytes) || 0);
        }, 0) / (1024 * 1024);
    }, [documents]);

    function formatFileSize(bytes, decimals = 2) {
        if (bytes === null || bytes === undefined) {
            return 'N/A';
        }

        if (bytes === 0) return '0 B';


        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
    }

    const getDocuments = () => {
        console.log("Fetching documents...");
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/files`)
            .then(response => {
                console.log("Documents fetched successfully:", response.data);
                setDocuments(response.data);
            })
            .catch(error => {
                console.error("Error fetching documents:", error);
            });
    }

    function uploadfile(file) {
        const filename = file.name;
        const workspaceId = "f2f8cc21-3970-4a25-bf41-918857571645";
        console.log("Uploading file:", file);
        axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/upload/${userId}/${workspaceId}?filename=${encodeURIComponent(filename)}`, file, {
                headers: {
                    "Content-Type": file.type,
                },
            })
            .then((response) => {
                alert("File uploaded successfully!");
                console.log("File uploaded successfully:", response.data);
            })
            .catch((error) => {
                console.error("Error uploading file:", error);
            });
    }
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar - Desktop */}
            <aside
                className={`hidden md:flex transition-all duration-300 bg-white dark:bg-gray-800 shadow-md flex-col ${isCollapsed ? "w-20" : "w-64"
                    }`}
            >
                {/* Sidebar header */}
                <div className="flex items-center justify-between h-16 px-4">
                    {!isCollapsed ? (
                        <div className="text-xl font-bold flex items-center space-x-2 text-gray-900 dark:text-white">
                            <Folder className="h-6 w-6 text-indigo-600" />
                            <span>Vault</span>
                        </div>
                    ) : (
                        <Folder className="h-6 w-6 text-indigo-600 mx-auto" />
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="ml-auto p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {isCollapsed ? (
                            <ChevronRight className="h-5 w-5" />
                        ) : (
                            <ChevronLeft className="h-5 w-5" />
                        )}
                    </button>
                </div>

                {/* Sidebar navigation */}
                <nav className="p-4 space-y-2 flex-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.name}
                                onClick={() => setSelectedPage(item.name)}
                                className={`flex items-center w-full px-3 py-2 rounded-md transition duration-150 ease-in-out ${selectedPage === item.name
                                    ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-white"
                                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                    }`}
                            >
                                <Icon
                                    className={`h-5 w-5 ${isCollapsed ? "mx-auto" : "mr-3"}`}
                                />
                                {!isCollapsed && <span className="truncate">{item.name}</span>}
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Sidebar - Mobile */}
            <div
                className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out md:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                        <Folder className="h-6 w-6 text-indigo-600" />
                        <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                            Vault
                        </span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label="Close sidebar"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <nav className="p-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <a
                                key={item.name}
                                href="#"
                                onClick={() => {
                                    setSelectedPage(item.name);
                                    setSidebarOpen(false);
                                }}
                                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${selectedPage === item.name
                                    ? "bg-indigo-50 text-indigo-700 dark:bg-gray-700 dark:text-white"
                                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                    }`}
                            >
                                <Icon className="h-5 w-5 flex-shrink-0" />
                                <span className="ml-3 truncate">{item.name}</span>
                            </a>
                        );
                    })}
                </nav>
            </div>

            {/* Main Content */}
            {/* Removed the 'md:ml-20' and 'md:ml-64' from the main content div as these are handled by the flex layout */}
            <div className="flex flex-col flex-1">
                {/* Topbar: Fixed for Alignment */}
                <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center">
                            {/* Mobile sidebar toggle button */}
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 mr-4"
                                aria-label="Open sidebar"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                            {/* Dashboard title */}
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white leading-tight">
                                {selectedPage}
                            </h1>
                        </div>
                        {/* Upload button */}
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-row  dark:text-white border-gray-700 dark:hover:bg-gray-700 hover:bg-gray-100 flex items-center"
                                onClick={() => setDialogOpen(true)}
                            >
                                <label className="flex items-center cursor-pointer">
                                    <Upload className="h-4 w-4 mr-2" />
                                    <input onChange={(e) => uploadfile(e.target.files[0])} type="file" className="hidden" />
                                    <span>Upload</span>
                                </label>
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Main content area */}
                {/* Removed 'p-6' to eliminate the space */}
                <main className="flex-1 overflow-y-auto">
                    {/* Welcome Card */}
                    {selectedPage === "Dashboard" && (
                        <Card className="m-6 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-800">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                                    Welcome back, {firstName} !
                                </CardTitle>
                                <CardDescription className="text-gray-700 dark:text-gray-300">
                                    Here's what's happening with your documents today.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    )}

                    {/* Metrics */}
                    {selectedPage === "Dashboard" && (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mx-6 mb-6">
                            {metrics.map((metric, index) => (
                                <Card
                                    key={index}
                                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                >
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {metric.title}
                                        </CardTitle>
                                        <div className="p-2 rounded-md bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                            {metric.icon}
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{metric.value}</div>
                                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                                            {metric.change}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Table and Actions (Dashboard, My Documents & Recent) */}
                    {(selectedPage === 'Dashboard' || selectedPage === 'My Documents') && (
                        <div className="grid gap-6 lg:grid-cols-3 mx-6 mt-10">
                            <Card className="lg:col-span-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>Recent Documents</span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="flex items-center"
                                        >
                                            View All
                                        </Button>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="text-gray-700 dark:text-gray-300">
                                                        Name
                                                    </TableHead>
                                                    <TableHead className="text-gray-700 dark:text-gray-300">
                                                        Type
                                                    </TableHead>
                                                    <TableHead className="text-gray-700 dark:text-gray-300">
                                                        Last Modified
                                                    </TableHead>
                                                    <TableHead className="w-[100px] text-gray-700 dark:text-gray-300 text-center">
                                                        Actions
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {mockDocuments.map((doc) => (
                                                    <TableRow key={doc.id} className="align-middle">
                                                        <TableCell className="font-medium flex items-center text-gray-900 dark:text-white whitespace-nowrap">
                                                            <FileText className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" />
                                                            {doc.name}
                                                        </TableCell>
                                                        <TableCell className="whitespace-nowrap">
                                                            <Badge variant="outline">{doc.type}</Badge>
                                                        </TableCell>
                                                        <TableCell className="text-gray-900 dark:text-white whitespace-nowrap">
                                                            {doc.modified}
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button
                                                                        variant="ghost"
                                                                        className="h-8 w-8 p-0"
                                                                    >
                                                                        <MoreVertical className="h-4 w-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                                                                    <DropdownMenuItem>
                                                                        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                                                            <Download className="mr-2 h-4 w-4" />
                                                                            Download
                                                                        </a>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                                                            <Share2 className="mr-2 h-4 w-4" />
                                                                            Share
                                                                        </a>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem className="text-red-600">
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
                            {/* <div className="grid gap-6 lg:grid-cols-3 mx-6"> */}
                            <Card className="lg:col-span-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>My Documents</span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="flex items-center"
                                            onClick={() => getDocuments()}
                                        >
                                            Refresh
                                        </Button>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {documents.length === 0 ? (
                                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                            No documents found. Upload a file to get started.
                                        </div>
                                    ) : (
                                        <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-x-auto">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="text-gray-700 dark:text-gray-300">
                                                            Name
                                                        </TableHead>
                                                        <TableHead className="text-gray-700 dark:text-gray-300">
                                                            Type
                                                        </TableHead>
                                                        <TableHead className="text-gray-700 dark:text-gray-300">
                                                            Size
                                                        </TableHead>
                                                        <TableHead className="w-[100px] text-gray-700 dark:text-gray-300 text-center">
                                                            Actions
                                                        </TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {documents.map((doc) => (
                                                        <TableRow key={doc.id} className="align-middle">
                                                            <TableCell className="font-medium flex items-center text-gray-900 dark:text-white whitespace-nowrap">
                                                                <FileText className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" />
                                                                {doc.file_name}
                                                            </TableCell>
                                                            <TableCell className="whitespace-nowrap">
                                                                <Badge variant="outline">{doc.file_type || 'N/A'}</Badge>
                                                            </TableCell>
                                                            <TableCell className="text-gray-900 dark:text-white whitespace-nowrap">
                                                                {formatFileSize(doc.file_size_bytes) || 'N/A'}
                                                            </TableCell>
                                                            <TableCell className="text-center">
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <Button
                                                                            variant="ghost"
                                                                            className="h-8 w-8 p-0"
                                                                        >
                                                                            <MoreVertical className="h-4 w-4" />
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                                                                        <DropdownMenuItem>
                                                                            <a href={doc.file_path} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2" >
                                                                                <Download className="mr-2 h-4 w-4" />
                                                                                Download
                                                                            </a>
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem>
                                                                            <a href={doc.file_path} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2" >
                                                                                <Share2 className="mr-2 h-4 w-4" />
                                                                                Share
                                                                            </a>
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem className="text-red-600">
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
                                    )}</CardContent>
                            </Card>

                            {/* Sidebar Cards - Hide for Recent tab */}
                            <div className="space-y-6">
                                <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                                    <CardHeader>
                                        <CardTitle>Quick Actions</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start flex items-center"
                                        >
                                             <Upload className="mr-2 h-4 w-4" />
                  <span>Upload Files</span>
                  <input
                    type="file"
                    onChange={(e) => uploadfile(e.target.files[0])}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start flex items-center"
                                        >
                                            <Folder className="mr-2 h-4 w-4" />
                                            Create Folder
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start flex items-center"
                                        >
                                            <Share2 className="mr-2 h-4 w-4" />
                                            Share Document
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start flex items-center"
                                        >
                                            <Users className="mr-2 h-4 w-4" />
                                            Manage Team
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                                    <CardHeader>
                                        <CardTitle>Storage Usage</CardTitle>
                                        <CardDescription className="text-gray-700 dark:text-gray-300">
                                            {totalBytes}  of 100 MB used
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-2.5 w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                            <div
                                                className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500"
                                                style={{ width: `${totalBytesperc}%` }}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {selectedPage === "Shared" && (
                        <div className="text-lg text-gray-900 dark:text-white p-6">
                            Shared Files section coming soon...
                        </div>
                    )}

                    {selectedPage === "Recent" && (
                        <div className="text-lg text-gray-900 dark:text-white p-6">
                            Recent Activity section coming soon...
                        </div>
                    )}

                    {selectedPage === "Trash" && (
                        <div className="text-lg text-gray-900 dark:text-white p-6">
                            Trash section coming soon...
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
