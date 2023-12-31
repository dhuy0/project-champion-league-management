USE [master]
GO
/****** Object:  Database [V_League]    Script Date: 04/01/2024 12:10:52 PM ******/
if DB_ID('V_League') IS NOT NULL
	alter database V_League set single_user with rollback immediate
	DROP DATABASE  V_League
GO
/****** Object:  Database [V_League]    Script Date: 04/01/2024 12:10:52 PM ******/
CREATE DATABASE [V_League]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'V_League', FILENAME = N'D:\Environment\SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\V_League.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'V_League_log', FILENAME = N'D:\Environment\SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\V_League_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [V_League] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [V_League].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [V_League] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [V_League] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [V_League] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [V_League] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [V_League] SET ARITHABORT OFF 
GO
ALTER DATABASE [V_League] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [V_League] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [V_League] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [V_League] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [V_League] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [V_League] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [V_League] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [V_League] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [V_League] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [V_League] SET  ENABLE_BROKER 
GO
ALTER DATABASE [V_League] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [V_League] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [V_League] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [V_League] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [V_League] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [V_League] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [V_League] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [V_League] SET RECOVERY FULL 
GO
ALTER DATABASE [V_League] SET  MULTI_USER 
GO
ALTER DATABASE [V_League] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [V_League] SET DB_CHAINING OFF 
GO
ALTER DATABASE [V_League] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [V_League] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [V_League] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [V_League] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'V_League', N'ON'
GO
ALTER DATABASE [V_League] SET QUERY_STORE = ON
GO
ALTER DATABASE [V_League] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [V_League]
GO
/****** Object:  Table [dbo].[BanThang]    Script Date: 04/01/2024 12:10:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BanThang](
	[MaBanThang] [int] IDENTITY(1,1) NOT NULL,
	[MaCauThu] [varchar](255) NOT NULL,
	[TenDoiBong] [nvarchar](255) NOT NULL,
	[LoaiBanThang] [nvarchar](255) NOT NULL,
	[ThoiDiem] [int] NOT NULL,
	[MaTranDau] [varchar](255) NOT NULL,
	[VongDau] [int] NOT NULL,
 CONSTRAINT [PK_BanThang] PRIMARY KEY CLUSTERED 
(
	[MaBanThang] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CauThu]    Script Date: 04/01/2024 12:10:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CauThu](
	[MaCauThu] [varchar](255) NOT NULL,
	[TenDoiBong] [nvarchar](255) NOT NULL,
	[TenCauThu] [nvarchar](255) NOT NULL,
	[LoaiCauThu] [nvarchar](255) NOT NULL,
	[TongSoBanThang] [int] NOT NULL,
	[NgaySinh] [date] NOT NULL,
	[GhiChu] [nvarchar](255) NULL,
 CONSTRAINT [PK_CauThu] PRIMARY KEY CLUSTERED 
(
	[MaCauThu] ASC,
	[TenDoiBong] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DoiBong]    Script Date: 04/01/2024 12:10:53 PM ******/
/****** Object:  Table [dbo].[DoiBong]    Script Date: 04/01/2024 12:10:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DoiBong](
	[MaDoiBong] [int] IDENTITY(1,1) NOT NULL,
	[TenDoiBong] [nvarchar](255) NOT NULL,
	[SanNha] [nvarchar](255) NOT NULL,
	[SoTranThang] [int] NULL,
	[SoTranHoa] [int] NULL,
	[SoTranThua] [int] NULL,
	[HieuSo] [int] NULL,
	[Diem] [int] NULL,
	[Hang] [int] NULL,
 CONSTRAINT [PK_DoiBong] PRIMARY KEY CLUSTERED 
(
	[MaDoiBong] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[QuyDinh]    Script Date: 04/01/2024 12:10:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QuyDinh](
	[DoTuoi_Min] [int] NULL,
	[DoTuoi_Max] [int] NULL,
	[SoCauThu_Min] [int] NULL,
	[SoCauThu_Max] [int] NULL,
	[SoCauThuNuocNgoai_Max] [int] NULL,
	[ThoiDiemGhiBan_Max] [int] NULL,
	[DiemSoThang] [int] NULL,
	[DiemSoHoa] [int] NULL,
	[DiemSoThua] [int] NULL,
	[CacLoaiBanThang] [char](50) NULL,
	[QuyTacXepHang] [nvarchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TranDau]    Script Date: 04/01/2024 12:10:53 PM ******/
/****** Object:  Table [dbo].[TranDau]    Script Date: 04/01/2024 12:10:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TranDau](
	[MaTranDau] [varchar](255) NOT NULL,
	[VongDau] [int] NOT NULL,
	[TenDoi1] [nvarchar](255) NOT NULL,
	[TenDoi2] [nvarchar](255) NOT NULL,
	[SanDau] [nvarchar](255) NOT NULL,
	[Ngay] [date] NOT NULL,
	[Gio] [time](7) NOT NULL,
	[TySoDoi1] [int] NULL,
	[TySoDoi2] [int] NULL,
 CONSTRAINT [PK_TranDau] PRIMARY KEY CLUSTERED 
(
	[MaTranDau] ASC,
	[VongDau] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[BanThang] ON 

-- INSERT [dbo].[BanThang] ([MaBanThang], [MaCauThu], [TenDoiBong], [LoaiBanThang], [ThoiDiem], [MaTranDau], [VongDau]) VALUES (8, N'2', N'SLNA', N'B', 96, N'11', 2)
-- INSERT [dbo].[BanThang] ([MaBanThang], [MaCauThu], [TenDoiBong], [LoaiBanThang], [ThoiDiem], [MaTranDau], [VongDau]) VALUES (9, N'4', N'Hà Tĩnh', N'C', 34, N'14', 3)
-- INSERT [dbo].[BanThang] ([MaBanThang], [MaCauThu], [TenDoiBong], [LoaiBanThang], [ThoiDiem], [MaTranDau], [VongDau]) VALUES (11, N'6', N'Hà Nội', N'A', 4, N'14', 3)
-- SET IDENTITY_INSERT [dbo].[BanThang] OFF
-- GO
-- INSERT [dbo].[CauThu] ([MaCauThu], [TenDoiBong], [TenCauThu], [LoaiCauThu], [TongSoBanThang], [NgaySinh], [GhiChu]) VALUES (N'2', N'HAGL', N'Duc', N'Nội binh', 1, CAST(N'2003-02-01' AS Date), NULL)
-- INSERT [dbo].[CauThu] ([MaCauThu], [TenDoiBong], [TenCauThu], [LoaiCauThu], [TongSoBanThang], [NgaySinh], [GhiChu]) VALUES (N'2', N'SLNA', N'Vinh', N'Nội binh', 0, CAST(N'2001-03-02' AS Date), NULL)
-- INSERT [dbo].[CauThu] ([MaCauThu], [TenDoiBong], [TenCauThu], [LoaiCauThu], [TongSoBanThang], [NgaySinh], [GhiChu]) VALUES (N'3', N'HAGL', N'Vu', N'Ngoại binh', 5, CAST(N'2001-02-04' AS Date), NULL)
-- INSERT [dbo].[CauThu] ([MaCauThu], [TenDoiBong], [TenCauThu], [LoaiCauThu], [TongSoBanThang], [NgaySinh], [GhiChu]) VALUES (N'3', N'SLNA', N'Vu', N'Ngoại binh', 1, CAST(N'2004-03-02' AS Date), NULL)
-- INSERT [dbo].[CauThu] ([MaCauThu], [TenDoiBong], [TenCauThu], [LoaiCauThu], [TongSoBanThang], [NgaySinh], [GhiChu]) VALUES (N'4', N'Hà Tĩnh', N'Phong', N'Nội binh', 4, CAST(N'2002-02-02' AS Date), NULL)
-- INSERT [dbo].[CauThu] ([MaCauThu], [TenDoiBong], [TenCauThu], [LoaiCauThu], [TongSoBanThang], [NgaySinh], [GhiChu]) VALUES (N'6', N'Hà Nội', N'Linh', N'Ngoại binh', 3, CAST(N'2001-04-02' AS Date), NULL)
-- GO
-- SET IDENTITY_INSERT [dbo].[DoiBong] ON 

-- INSERT [dbo].[DoiBong] ([MaDoiBong], [TenDoiBong], [SanNha], [SoTranThang], [SoTranHoa], [SoTranThua], [HieuSo], [Diem], [Hang]) VALUES (1, N'SLNA', N'Vinh', 9, 2, 1, 1, 29, NULL)
-- INSERT [dbo].[DoiBong] ([MaDoiBong], [TenDoiBong], [SanNha], [SoTranThang], [SoTranHoa], [SoTranThua], [HieuSo], [Diem], [Hang]) VALUES (2, N'HAGL', N'Pleiku', 3, 0, 2, 1, 9, NULL)
-- INSERT [dbo].[DoiBong] ([MaDoiBong], [TenDoiBong], [SanNha], [SoTranThang], [SoTranHoa], [SoTranThua], [HieuSo], [Diem], [Hang]) VALUES (7, N'Hà Nội', N'Hàng Đẫy', NULL, NULL, NULL, -1, NULL, NULL)
-- INSERT [dbo].[DoiBong] ([MaDoiBong], [TenDoiBong], [SanNha], [SoTranThang], [SoTranHoa], [SoTranThua], [HieuSo], [Diem], [Hang]) VALUES (8, N'Bình Dương', N'Gò Đậu', 0, 0, 1, NULL, 0, NULL)
-- INSERT [dbo].[DoiBong] ([MaDoiBong], [TenDoiBong], [SanNha], [SoTranThang], [SoTranHoa], [SoTranThua], [HieuSo], [Diem], [Hang]) VALUES (9, N'Hà Tĩnh', N'Hà Tĩnh', 1, 0, 0, NULL, 3, NULL)
-- SET IDENTITY_INSERT [dbo].[DoiBong] OFF
-- GO
INSERT [dbo].[QuyDinh] ([DoTuoi_Min], [DoTuoi_Max], [SoCauThu_Min], [SoCauThu_Max], [SoCauThuNuocNgoai_Max], [ThoiDiemGhiBan_Max], [DiemSoThang], [DiemSoHoa], [DiemSoThua], [CacLoaiBanThang], [QuyTacXepHang]) VALUES (16, 40, 15, 22, 3, 96, 3, 1, 0, 'A, B, C', N'Điểm')
-- GO
-- INSERT [dbo].[TranDau] ([MaTranDau], [VongDau], [TenDoi1], [TenDoi2], [SanDau], [Ngay], [Gio], [TySoDoi1], [TySoDoi2]) VALUES (N'1', 11, N'Hà Nội', N'HAGL', N'Hàng Đẫy', CAST(N'2003-04-03' AS Date), CAST(N'15:00:00' AS Time), 0, 1)
-- INSERT [dbo].[TranDau] ([MaTranDau], [VongDau], [TenDoi1], [TenDoi2], [SanDau], [Ngay], [Gio], [TySoDoi1], [TySoDoi2]) VALUES (N'11', 2, N'SLNA', N'HAGL', N'Vinh', CAST(N'2023-12-12' AS Date), CAST(N'17:00:00' AS Time), 3, 2)
-- INSERT [dbo].[TranDau] ([MaTranDau], [VongDau], [TenDoi1], [TenDoi2], [SanDau], [Ngay], [Gio], [TySoDoi1], [TySoDoi2]) VALUES (N'14', 3, N'HAGL', N'Hà Nội', N'Pleiku', CAST(N'2023-12-28' AS Date), CAST(N'18:00:00' AS Time), 2, 1)
-- INSERT [dbo].[TranDau] ([MaTranDau], [VongDau], [TenDoi1], [TenDoi2], [SanDau], [Ngay], [Gio], [TySoDoi1], [TySoDoi2]) VALUES (N'15', 4, N'HAGL', N'Hà Tĩnh', N'Pleiku', CAST(N'2001-01-01' AS Date), CAST(N'17:00:00' AS Time), 0, 2)
-- INSERT [dbo].[TranDau] ([MaTranDau], [VongDau], [TenDoi1], [TenDoi2], [SanDau], [Ngay], [Gio], [TySoDoi1], [TySoDoi2]) VALUES (N'17', 9, N'HAGL', N'Bình Dương', N'Pleiku', CAST(N'2001-01-01' AS Date), CAST(N'16:00:00' AS Time), 3, 1)
-- GO
-- INSERT [dbo].[DoiBong] ([MaDoiBong], [TenDoiBong], [SanNha], [SoTranThang], [SoTranHoa], [SoTranThua], [HieuSo], [Diem], [Hang]) VALUES (1, N'SLNA', N'Vinh', 9, 2, 1, 1, 29, NULL)
-- INSERT [dbo].[DoiBong] ([MaDoiBong], [TenDoiBong], [SanNha], [SoTranThang], [SoTranHoa], [SoTranThua], [HieuSo], [Diem], [Hang]) VALUES (2, N'HAGL', N'Pleiku', 3, 0, 2, 1, 9, NULL)
-- INSERT [dbo].[DoiBong] ([MaDoiBong], [TenDoiBong], [SanNha], [SoTranThang], [SoTranHoa], [SoTranThua], [HieuSo], [Diem], [Hang]) VALUES (7, N'Hà Nội', N'Hàng Đẫy', NULL, NULL, NULL, -1, NULL, NULL)
-- INSERT [dbo].[DoiBong] ([MaDoiBong], [TenDoiBong], [SanNha], [SoTranThang], [SoTranHoa], [SoTranThua], [HieuSo], [Diem], [Hang]) VALUES (8, N'Bình Dương', N'Gò Đậu', 0, 0, 1, NULL, 0, NULL)
-- INSERT [dbo].[DoiBong] ([MaDoiBong], [TenDoiBong], [SanNha], [SoTranThang], [SoTranHoa], [SoTranThua], [HieuSo], [Diem], [Hang]) VALUES (9, N'Hà Tĩnh', N'Hà Tĩnh', 1, 0, 0, NULL, 3, NULL)
SET IDENTITY_INSERT [dbo].[DoiBong] OFF
GO
INSERT [dbo].[QuyDinh] ([DoTuoi_Min], [DoTuoi_Max], [SoCauThu_Min], [SoCauThu_Max], [SoCauThuNuocNgoai_Max], [ThoiDiemGhiBan_Max], [DiemSoThang], [DiemSoHoa], [DiemSoThua]) VALUES (18, 40, NULL, 2, 1, 96, 3, 1, 0)
-- GO
-- INSERT [dbo].[TranDau] ([MaTranDau], [VongDau], [TenDoi1], [TenDoi2], [SanDau], [Ngay], [Gio], [TySoDoi1], [TySoDoi2]) VALUES (N'1', 11, N'Hà Nội', N'HAGL', N'Hàng Đẫy', CAST(N'2003-04-03' AS Date), CAST(N'15:00:00' AS Time), 0, 1)
-- INSERT [dbo].[TranDau] ([MaTranDau], [VongDau], [TenDoi1], [TenDoi2], [SanDau], [Ngay], [Gio], [TySoDoi1], [TySoDoi2]) VALUES (N'11', 2, N'SLNA', N'HAGL', N'Vinh', CAST(N'2023-12-12' AS Date), CAST(N'17:00:00' AS Time), 3, 2)
-- INSERT [dbo].[TranDau] ([MaTranDau], [VongDau], [TenDoi1], [TenDoi2], [SanDau], [Ngay], [Gio], [TySoDoi1], [TySoDoi2]) VALUES (N'14', 3, N'HAGL', N'Hà Nội', N'Pleiku', CAST(N'2023-12-28' AS Date), CAST(N'18:00:00' AS Time), 2, 1)
-- INSERT [dbo].[TranDau] ([MaTranDau], [VongDau], [TenDoi1], [TenDoi2], [SanDau], [Ngay], [Gio], [TySoDoi1], [TySoDoi2]) VALUES (N'15', 4, N'HAGL', N'Hà Tĩnh', N'Pleiku', CAST(N'2001-01-01' AS Date), CAST(N'17:00:00' AS Time), 0, 2)
-- INSERT [dbo].[TranDau] ([MaTranDau], [VongDau], [TenDoi1], [TenDoi2], [SanDau], [Ngay], [Gio], [TySoDoi1], [TySoDoi2]) VALUES (N'17', 9, N'HAGL', N'Bình Dương', N'Pleiku', CAST(N'2001-01-01' AS Date), CAST(N'16:00:00' AS Time), 3, 1)
-- GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [unique_SanNha]    Script Date: 04/01/2024 12:10:53 PM ******/
/****** Object:  Index [unique_SanNha]    Script Date: 04/01/2024 12:10:53 PM ******/
ALTER TABLE [dbo].[DoiBong] ADD  CONSTRAINT [unique_SanNha] UNIQUE NONCLUSTERED 
(
	[SanNha] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [unique_TenDoi]    Script Date: 04/01/2024 12:10:53 PM ******/
/****** Object:  Index [unique_TenDoi]    Script Date: 04/01/2024 12:10:53 PM ******/
ALTER TABLE [dbo].[DoiBong] ADD  CONSTRAINT [unique_TenDoi] UNIQUE NONCLUSTERED 
(
	[TenDoiBong] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [unique_Doi1_Doi2]    Script Date: 04/01/2024 12:10:53 PM ******/
ALTER TABLE [dbo].[TranDau] ADD  CONSTRAINT [unique_Doi1_Doi2] UNIQUE NONCLUSTERED 
(
	[TenDoi1] ASC,
	[TenDoi2] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [unique_Doi1_Doi2]    Script Date: 04/01/2024 12:10:53 PM ******/
ALTER TABLE [dbo].[TranDau] ADD  CONSTRAINT [unique_Doi1_Doi2] UNIQUE NONCLUSTERED 
(
	[TenDoi1] ASC,
	[TenDoi2] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[BanThang]  WITH CHECK ADD  CONSTRAINT [FK_BanThang_CauThu] FOREIGN KEY([MaCauThu], [TenDoiBong])
REFERENCES [dbo].[CauThu] ([MaCauThu], [TenDoiBong])
ON UPDATE CASCADE
ON DELETE CASCADE
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[BanThang] CHECK CONSTRAINT [FK_BanThang_CauThu]
GO
ALTER TABLE [dbo].[BanThang]  WITH CHECK ADD  CONSTRAINT [FK_BanThang_TranDau] FOREIGN KEY([MaTranDau], [VongDau])
REFERENCES [dbo].[TranDau] ([MaTranDau], [VongDau])
ON UPDATE CASCADE
ON DELETE CASCADE
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[BanThang] CHECK CONSTRAINT [FK_BanThang_TranDau]
GO
ALTER TABLE [dbo].[CauThu]  WITH CHECK ADD  CONSTRAINT [FK_CauThu_DoiBong] FOREIGN KEY([TenDoiBong])
REFERENCES [dbo].[DoiBong] ([TenDoiBong])
ON UPDATE CASCADE
ON DELETE CASCADE
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CauThu] CHECK CONSTRAINT [FK_CauThu_DoiBong]
GO
ALTER TABLE [dbo].[TranDau]  WITH CHECK ADD  CONSTRAINT [FK_TranDau_Doi1] FOREIGN KEY([TenDoi1])
REFERENCES [dbo].[DoiBong] ([TenDoiBong])
GO
ALTER TABLE [dbo].[TranDau] CHECK CONSTRAINT [FK_TranDau_Doi1]
GO
ALTER TABLE [dbo].[TranDau]  WITH CHECK ADD  CONSTRAINT [FK_TranDau_Doi2] FOREIGN KEY([TenDoi2])
REFERENCES [dbo].[DoiBong] ([TenDoiBong])
GO
ALTER TABLE [dbo].[TranDau] CHECK CONSTRAINT [FK_TranDau_Doi2]
GO
ALTER TABLE [dbo].[TranDau]  WITH CHECK ADD  CONSTRAINT [FK_TranDau_San] FOREIGN KEY([SanDau])
REFERENCES [dbo].[DoiBong] ([SanNha])
GO
ALTER TABLE [dbo].[TranDau] CHECK CONSTRAINT [FK_TranDau_San]
GO
/****** Object:  Trigger [dbo].[KiemTraThoiDiemGhiBanToiDa]    Script Date: 04/01/2024 12:10:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create   trigger [dbo].[KiemTraThoiDiemGhiBanToiDa]
ON [dbo].[BanThang]
FOR INSERT, update
AS
	IF (select I.ThoiDiem from inserted I) > (select ThoiDiemGhiBan_Max from QuyDinh)
	BEGIN
		RAISERROR(N'Thời điểm ghi bàn vượt quá thời điểm ghi bàn tối đa!', 16,1)
		ROLLBACK TRAN
	END
GO
ALTER TABLE [dbo].[BanThang] ENABLE TRIGGER [KiemTraThoiDiemGhiBanToiDa]
GO
/****** Object:  Trigger [dbo].[KiemTraDoTuoi]    Script Date: 04/01/2024 12:10:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create   trigger [dbo].[KiemTraDoTuoi]
ON [dbo].[CauThu]
FOR INSERT, update
AS
	--ĐIỀU KIỆN KIỂM TRA VI PHẠM
	IF (select datediff(yy,I.NgaySinh,GETDATE())
		from inserted I) < (select DoTuoi_Min from QuyDinh)
	or (select datediff(yy,I.NgaySinh,GETDATE())
		from inserted I) > (select DoTuoi_Max from QuyDinh)
	BEGIN
		RAISERROR(N'Cầu thủ không đạt độ tuổi yêu cầu!', 16,1)
		ROLLBACK TRAN
	END
GO
ALTER TABLE [dbo].[CauThu] ENABLE TRIGGER [KiemTraDoTuoi]
GO
/****** Object:  Trigger [dbo].[KiemTraSoCauThuToiDa]    Script Date: 04/01/2024 12:10:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create   trigger [dbo].[KiemTraSoCauThuToiDa]
ON [dbo].[CauThu]
FOR INSERT
AS
	--ĐIỀU KIỆN KIỂM TRA VI PHẠM
	IF (select count(CT.MaCauThu)
		from CauThu CT join inserted I on CT.TenDoiBong = I.TenDoiBong
		where CT.TenDoiBong = I.TenDoiBong
		group by CT.TenDoiBong) > (select SoCauThu_Max from QuyDinh)
	BEGIN
		RAISERROR(N'Số cầu thủ đã vượt quy định cho phép!', 16,1)
		ROLLBACK TRAN
	END
GO
ALTER TABLE [dbo].[CauThu] ENABLE TRIGGER [KiemTraSoCauThuToiDa]
GO
/****** Object:  Trigger [dbo].[KiemTraSoNgoaiBinh]    Script Date: 04/01/2024 12:10:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create   trigger [dbo].[KiemTraSoNgoaiBinh]
ON [dbo].[CauThu]
FOR INSERT, update
AS
	--ĐIỀU KIỆN KIỂM TRA VI PHẠM
	IF (select count(CT.MaCauThu)
		from CauThu CT join inserted I on CT.TenDoiBong = I.TenDoiBong
		where CT.TenDoiBong = I.TenDoiBong and CT.LoaiCauThu = N'Ngoại binh'
		group by CT.TenDoiBong, CT.LoaiCauThu) > (select SoCauThuNuocNgoai_Max from QuyDinh)
	BEGIN
		RAISERROR(N'Số cầu thủ ngoại binh đã vượt quy định cho phép!', 16,1)
		ROLLBACK TRAN
	END
GO
ALTER TABLE [dbo].[CauThu] ENABLE TRIGGER [KiemTraSoNgoaiBinh]
GO
/****** Object:  Trigger [dbo].[TinhSoDiem]    Script Date: 04/01/2024 12:10:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create   trigger [dbo].[TinhSoDiem]
ON [dbo].[DoiBong]
FOR INSERT, update
AS
	BEGIN
		declare @Diem int = (select DiemSoThang from QuyDinh) * (select I.SoTranThang from inserted I) + (select DiemSoHoa from QuyDinh) * (select I.SoTranHoa from inserted I) + (select DiemSoThua from QuyDinh) * (select I.SoTranThua from inserted I)
		update DoiBong set Diem = @Diem where TenDoiBong = (select I.TenDoiBong from inserted I)
	END
GO
ALTER TABLE [dbo].[DoiBong] ENABLE TRIGGER [TinhSoDiem]
GO
/****** Object:  Trigger [dbo].[GhiNhanKetQua]    Script Date: 04/01/2024 12:10:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create   trigger [dbo].[GhiNhanKetQua]
ON [dbo].[TranDau]
FOR INSERT
AS
	BEGIN
		DECLARE @HieuSoDoi1 INT = (SELECT i.TySoDoi1 - i.TySoDoi2 FROM INSERTED i)
		DECLARE @HieuSoDoi2 INT = -(@HieuSoDoi1)
		UPDATE DoiBong SET HieuSo = @HieuSoDoi1 WHERE TenDoiBong = (select I.TenDoi1 from inserted I)
		UPDATE DoiBong SET HieuSo = @HieuSoDoi2 WHERE TenDoiBong = (select I.TenDoi2 from inserted I)
		IF @HieuSoDoi1 > 0
		BEGIN
			UPDATE DoiBong SET SoTranThang = SoTranThang + 1 WHERE TenDoiBong = (select I.TenDoi1 from inserted I)
			UPDATE DoiBong SET SoTranThua = SoTranThua + 1 WHERE TenDoiBong = (select I.TenDoi2 from inserted I)
		END
		IF @HieuSoDoi1 < 0
		BEGIN
			UPDATE DoiBong SET SoTranThua = SoTranThua + 1 WHERE TenDoiBong = (select I.TenDoi1 from inserted I)
			UPDATE DoiBong SET SoTranThang = SoTranThang + 1 WHERE TenDoiBong = (select I.TenDoi2 from inserted I)
		END
		IF @HieuSoDoi1 = 0
		BEGIN
			UPDATE DoiBong SET SoTranHoa = SoTranHoa + 1 WHERE TenDoiBong = (select I.TenDoi1 from inserted I)
			UPDATE DoiBong SET SoTranHoa = SoTranHoa + 1 WHERE TenDoiBong = (select I.TenDoi2 from inserted I)
		END
	END
GO
ALTER TABLE [dbo].[TranDau] ENABLE TRIGGER [GhiNhanKetQua]
GO
/****** Object:  Trigger [dbo].[KiemTraThanhTich]    Script Date: 04/01/2024 12:10:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE trigger [dbo].[KiemTraThanhTich]
ON [dbo].[TranDau]
FOR UPDATE
AS
	BEGIN
		DECLARE @TenDoi1 NVARCHAR(255)= (select I.TenDoi1 from inserted I)
		DECLARE @TenDoi2 NVARCHAR(255)= (select I.TenDoi2 from inserted I)
		--DECLARE @SoTranDaDauDoi1 INT = (SELECT count(td.TenDoi1) FROM TranDau td WHERE td.TenDoi1 = @TenDoi1)
		--+ (SELECT count(td.TenDoi2) FROM TranDau td WHERE td.TenDoi2 = @TenDoi1)
		--DECLARE @SoTranDaDauDoi2 INT = (SELECT count(td.TenDoi1) FROM TranDau td WHERE td.TenDoi1 = @TenDoi2)
		--+ (SELECT count(td.TenDoi2) FROM TranDau td WHERE td.TenDoi2 = @TenDoi2)
		DECLARE @HieuSoSanNhaDoi1 TABLE(HieuSo INT);
		INSERT INTO @HieuSoSanNhaDoi1 SELECT td.TySoDoi1 - td.TySoDoi2 FROM TranDau td WHERE td.TenDoi1 = @TenDoi1;
		DECLARE @HieuSoSanKhachDoi1 TABLE(HieuSo INT);
		INSERT INTO @HieuSoSanKhachDoi1 SELECT td.TySoDoi2 - td.TySoDoi1 FROM TranDau td WHERE td.TenDoi2 = @TenDoi1;
		DECLARE @HieuSoSanNhaDoi2 TABLE(HieuSo INT);
		INSERT INTO @HieuSoSanNhaDoi2 SELECT td.TySoDoi1 - td.TySoDoi2 FROM TranDau td WHERE td.TenDoi1 = @TenDoi2;
		DECLARE @HieuSoSanKhachDoi2 TABLE(HieuSo INT);
		INSERT INTO @HieuSoSanKhachDoi2 SELECT td.TySoDoi2 - td.TySoDoi1 FROM TranDau td WHERE td.TenDoi2 = @TenDoi2;
		UPDATE DoiBong SET SoTranThang = ((SELECT ISNULL(count(HieuSo), 0) FROM @HieuSoSanNhaDoi1 WHERE HieuSo > 0) + (SELECT ISNULL(count(HieuSo), 0) FROM @HieuSoSanKhachDoi1 WHERE HieuSo > 0)) WHERE TenDoiBong = @TenDoi1
		UPDATE DoiBong SET SoTranThang = ((SELECT ISNULL(count(HieuSo), 0) FROM @HieuSoSanNhaDoi2 WHERE HieuSo > 0) + (SELECT ISNULL(count(HieuSo), 0) FROM @HieuSoSanKhachDoi2 WHERE HieuSo > 0)) WHERE TenDoiBong = @TenDoi2
		UPDATE DoiBong SET SoTranHoa = ((SELECT ISNULL(count(HieuSo), 0) FROM @HieuSoSanNhaDoi1 WHERE HieuSo = 0) + (SELECT ISNULL(count(HieuSo), 0) FROM @HieuSoSanKhachDoi1 WHERE HieuSo = 0)) WHERE TenDoiBong = @TenDoi1
		UPDATE DoiBong SET SoTranHoa = ((SELECT ISNULL(count(HieuSo), 0) FROM @HieuSoSanNhaDoi2 WHERE HieuSo = 0) + (SELECT ISNULL(count(HieuSo), 0) FROM @HieuSoSanKhachDoi2 WHERE HieuSo = 0)) WHERE TenDoiBong = @TenDoi2
		UPDATE DoiBong SET SoTranThua = ((SELECT ISNULL(count(HieuSo), 0) FROM @HieuSoSanNhaDoi1 WHERE HieuSo < 0) + (SELECT ISNULL(count(HieuSo), 0) FROM @HieuSoSanKhachDoi1 WHERE HieuSo < 0)) WHERE TenDoiBong = @TenDoi1
		UPDATE DoiBong SET SoTranThua = ((SELECT ISNULL(count(HieuSo), 0) FROM @HieuSoSanNhaDoi2 WHERE HieuSo < 0) + (SELECT ISNULL(count(HieuSo), 0) FROM @HieuSoSanKhachDoi2 WHERE HieuSo < 0)) WHERE TenDoiBong = @TenDoi2
		UPDATE DoiBong SET HieuSo = (SELECT ISNULL(SUM(HieuSo), 0) FROM @HieuSoSanNhaDoi1) + (SELECT ISNULL(sum(HieuSo), 0) FROM @HieuSoSanKhachDoi1) WHERE TenDoiBong = @TenDoi1
		UPDATE DoiBong SET HieuSo = (SELECT ISNULL(SUM(HieuSo), 0) FROM @HieuSoSanNhaDoi2) + (SELECT ISNULL(sum(HieuSo), 0) FROM @HieuSoSanKhachDoi2) WHERE TenDoiBong = @TenDoi2
	END
GO
ALTER TABLE [dbo].[TranDau] ENABLE TRIGGER [KiemTraThanhTich]
GO
/****** Object:  Trigger [dbo].[KiemTraThoiDiemGhiBanToiDa]    Script Date: 04/01/2024 12:10:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create   trigger [dbo].[KiemTraThoiDiemGhiBanToiDa]
ON [dbo].[BanThang]
FOR INSERT, update
AS
	IF (select I.ThoiDiem from inserted I) > (select ThoiDiemGhiBan_Max from QuyDinh)
	BEGIN
		RAISERROR(N'Thời điểm ghi bàn vượt quá thời điểm ghi bàn tối đa!', 16,1)
		ROLLBACK TRAN
	END
GO
ALTER TABLE [dbo].[BanThang] ENABLE TRIGGER [KiemTraThoiDiemGhiBanToiDa]
GO
/****** Object:  Trigger [dbo].[KiemTraDoTuoi]    Script Date: 04/01/2024 12:10:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create   trigger [dbo].[KiemTraDoTuoi]
ON [dbo].[CauThu]
FOR INSERT, update
AS
	--ĐIỀU KIỆN KIỂM TRA VI PHẠM
	IF (select datediff(yy,I.NgaySinh,GETDATE())
		from inserted I) < (select DoTuoi_Min from QuyDinh)
	or (select datediff(yy,I.NgaySinh,GETDATE())
		from inserted I) > (select DoTuoi_Max from QuyDinh)
	BEGIN
		RAISERROR(N'Cầu thủ không đạt độ tuổi yêu cầu!', 16,1)
		ROLLBACK TRAN
	END
GO
ALTER TABLE [dbo].[CauThu] ENABLE TRIGGER [KiemTraDoTuoi]
GO
/****** Object:  Trigger [dbo].[KiemTraSoCauThuToiDa]    Script Date: 04/01/2024 12:10:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create   trigger [dbo].[KiemTraSoCauThuToiDa]
ON [dbo].[CauThu]
FOR INSERT
AS
	--ĐIỀU KIỆN KIỂM TRA VI PHẠM
	IF (select count(CT.MaCauThu)
		from CauThu CT join inserted I on CT.TenDoiBong = I.TenDoiBong
		where CT.TenDoiBong = I.TenDoiBong
		group by CT.TenDoiBong) > (select SoCauThu_Max from QuyDinh)
	BEGIN
		RAISERROR(N'Số cầu thủ đã vượt quy định cho phép!', 16,1)
		ROLLBACK TRAN
	END
GO
ALTER TABLE [dbo].[CauThu] ENABLE TRIGGER [KiemTraSoCauThuToiDa]
GO
/****** Object:  Trigger [dbo].[KiemTraSoNgoaiBinh]    Script Date: 04/01/2024 12:10:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create   trigger [dbo].[KiemTraSoNgoaiBinh]
ON [dbo].[CauThu]
FOR INSERT, update
AS
	--ĐIỀU KIỆN KIỂM TRA VI PHẠM
	IF (select count(CT.MaCauThu)
		from CauThu CT join inserted I on CT.TenDoiBong = I.TenDoiBong
		where CT.TenDoiBong = I.TenDoiBong and CT.LoaiCauThu = N'Ngoại binh'
		group by CT.TenDoiBong, CT.LoaiCauThu) > (select SoCauThuNuocNgoai_Max from QuyDinh)
	BEGIN
		RAISERROR(N'Số cầu thủ ngoại binh đã vượt quy định cho phép!', 16,1)
		ROLLBACK TRAN
	END
GO
ALTER TABLE [dbo].[CauThu] ENABLE TRIGGER [KiemTraSoNgoaiBinh]
GO
/****** Object:  Trigger [dbo].[TinhSoDiem]    Script Date: 04/01/2024 12:10:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create   trigger [dbo].[TinhSoDiem]
ON [dbo].[DoiBong]
FOR INSERT, update
AS
	BEGIN
		declare @Diem int = (select DiemSoThang from QuyDinh) * (select I.SoTranThang from inserted I) + (select DiemSoHoa from QuyDinh) * (select I.SoTranHoa from inserted I) + (select DiemSoThua from QuyDinh) * (select I.SoTranThua from inserted I)
		update DoiBong set Diem = @Diem where TenDoiBong = (select I.TenDoiBong from inserted I)
	END
GO
ALTER TABLE [dbo].[DoiBong] ENABLE TRIGGER [TinhSoDiem]
GO
/****** Object:  Trigger [dbo].[GhiNhanKetQua]    Script Date: 04/01/2024 12:10:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create   trigger [dbo].[GhiNhanKetQua]
ON [dbo].[TranDau]
FOR INSERT
AS
	BEGIN
		DECLARE @HieuSoDoi1 INT = (SELECT i.TySoDoi1 - i.TySoDoi2 FROM INSERTED i)
		DECLARE @HieuSoDoi2 INT = -(@HieuSoDoi1)
		UPDATE DoiBong SET HieuSo = @HieuSoDoi1 WHERE TenDoiBong = (select I.TenDoi1 from inserted I)
		UPDATE DoiBong SET HieuSo = @HieuSoDoi2 WHERE TenDoiBong = (select I.TenDoi2 from inserted I)
		IF @HieuSoDoi1 > 0
		BEGIN
			UPDATE DoiBong SET SoTranThang = SoTranThang + 1 WHERE TenDoiBong = (select I.TenDoi1 from inserted I)
			UPDATE DoiBong SET SoTranThua = SoTranThua + 1 WHERE TenDoiBong = (select I.TenDoi2 from inserted I)
		END
		IF @HieuSoDoi1 < 0
		BEGIN
			UPDATE DoiBong SET SoTranThua = SoTranThua + 1 WHERE TenDoiBong = (select I.TenDoi1 from inserted I)
			UPDATE DoiBong SET SoTranThang = SoTranThang + 1 WHERE TenDoiBong = (select I.TenDoi2 from inserted I)
		END
		IF @HieuSoDoi1 = 0
		BEGIN
			UPDATE DoiBong SET SoTranHoa = SoTranHoa + 1 WHERE TenDoiBong = (select I.TenDoi1 from inserted I)
			UPDATE DoiBong SET SoTranHoa = SoTranHoa + 1 WHERE TenDoiBong = (select I.TenDoi2 from inserted I)
		END
	END
GO
ALTER TABLE [dbo].[TranDau] ENABLE TRIGGER [GhiNhanKetQua]
GO
/****** Object:  Trigger [dbo].[KiemTraThanhTich]    Script Date: 04/01/2024 12:10:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create   trigger [dbo].[KiemTraThanhTich]
ON [dbo].[TranDau]
FOR UPDATE
AS
	BEGIN
		DECLARE @TenDoi1 NVARCHAR(255)= (select I.TenDoi1 from inserted I)
		DECLARE @TenDoi2 NVARCHAR(255)= (select I.TenDoi2 from inserted I)
		--DECLARE @SoTranDaDauDoi1 INT = (SELECT count(td.TenDoi1) FROM TranDau td WHERE td.TenDoi1 = @TenDoi1)
		--+ (SELECT count(td.TenDoi2) FROM TranDau td WHERE td.TenDoi2 = @TenDoi1)
		--DECLARE @SoTranDaDauDoi2 INT = (SELECT count(td.TenDoi1) FROM TranDau td WHERE td.TenDoi1 = @TenDoi2)
		--+ (SELECT count(td.TenDoi2) FROM TranDau td WHERE td.TenDoi2 = @TenDoi2)
		DECLARE @HieuSoSanNhaDoi1 TABLE(HieuSo INT);
		INSERT INTO @HieuSoSanNhaDoi1 SELECT td.TySoDoi1 - td.TySoDoi2 FROM TranDau td WHERE td.TenDoi1 = @TenDoi1;
		DECLARE @HieuSoSanKhachDoi1 TABLE(HieuSo INT);
		INSERT INTO @HieuSoSanKhachDoi1 SELECT td.TySoDoi2 - td.TySoDoi1 FROM TranDau td WHERE td.TenDoi2 = @TenDoi1;
		DECLARE @HieuSoSanNhaDoi2 TABLE(HieuSo INT);
		INSERT INTO @HieuSoSanNhaDoi2 SELECT td.TySoDoi1 - td.TySoDoi2 FROM TranDau td WHERE td.TenDoi1 = @TenDoi2;
		DECLARE @HieuSoSanKhachDoi2 TABLE(HieuSo INT);
		INSERT INTO @HieuSoSanKhachDoi2 SELECT td.TySoDoi2 - td.TySoDoi1 FROM TranDau td WHERE td.TenDoi2 = @TenDoi2;
		UPDATE DoiBong SET SoTranThang = ((SELECT count(HieuSo) FROM @HieuSoSanNhaDoi1 WHERE HieuSo > 0) + (SELECT count(HieuSo) FROM @HieuSoSanKhachDoi1 WHERE HieuSo > 0)) WHERE TenDoiBong = @TenDoi1
		UPDATE DoiBong SET SoTranThang = ((SELECT count(HieuSo) FROM @HieuSoSanNhaDoi2 WHERE HieuSo > 0) + (SELECT count(HieuSo) FROM @HieuSoSanKhachDoi2 WHERE HieuSo > 0)) WHERE TenDoiBong = @TenDoi2
		UPDATE DoiBong SET SoTranHoa = ((SELECT count(HieuSo) FROM @HieuSoSanNhaDoi1 WHERE HieuSo = 0) + (SELECT count(HieuSo) FROM @HieuSoSanKhachDoi1 WHERE HieuSo = 0)) WHERE TenDoiBong = @TenDoi1
		UPDATE DoiBong SET SoTranHoa = ((SELECT count(HieuSo) FROM @HieuSoSanNhaDoi2 WHERE HieuSo = 0) + (SELECT count(HieuSo) FROM @HieuSoSanKhachDoi2 WHERE HieuSo = 0)) WHERE TenDoiBong = @TenDoi2
		UPDATE DoiBong SET SoTranThua = ((SELECT count(HieuSo) FROM @HieuSoSanNhaDoi1 WHERE HieuSo < 0) + (SELECT count(HieuSo) FROM @HieuSoSanKhachDoi1 WHERE HieuSo < 0)) WHERE TenDoiBong = @TenDoi1
		UPDATE DoiBong SET SoTranThua = ((SELECT count(HieuSo) FROM @HieuSoSanNhaDoi2 WHERE HieuSo < 0) + (SELECT count(HieuSo) FROM @HieuSoSanKhachDoi2 WHERE HieuSo < 0)) WHERE TenDoiBong = @TenDoi2
		UPDATE DoiBong SET HieuSo = (SELECT sum(HieuSo) FROM @HieuSoSanNhaDoi1) + (SELECT sum(HieuSo) FROM @HieuSoSanKhachDoi1) WHERE TenDoiBong = @TenDoi1
		UPDATE DoiBong SET HieuSo = (SELECT sum(HieuSo) FROM @HieuSoSanNhaDoi2) + (SELECT sum(HieuSo) FROM @HieuSoSanKhachDoi2) WHERE TenDoiBong = @TenDoi2
	END
GO
ALTER TABLE [dbo].[TranDau] ENABLE TRIGGER [KiemTraThanhTich]
GO
USE [master]
GO
ALTER DATABASE [V_League] SET  READ_WRITE 
GO