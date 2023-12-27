USE [master]
GO
/****** Object:  Database [V_League]    Script Date: 27/12/2023 11:01:06 PM ******/
CREATE DATABASE [V_League]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'V_League', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\V_League.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'V_League_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\V_League_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
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
/****** Object:  Table [dbo].[BanThang]    Script Date: 27/12/2023 11:01:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BanThang](
	[MaBanThang] [varchar](255) NOT NULL,
	[CauThu] [varchar](255) NOT NULL,
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
/****** Object:  Table [dbo].[CauThu]    Script Date: 27/12/2023 11:01:07 PM ******/
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
/****** Object:  Table [dbo].[DoiBong]    Script Date: 27/12/2023 11:01:07 PM ******/
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
/****** Object:  Table [dbo].[QuyDinh]    Script Date: 27/12/2023 11:01:07 PM ******/
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
	[DiemSoThua] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TranDau]    Script Date: 27/12/2023 11:01:07 PM ******/
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
INSERT [dbo].[CauThu] ([MaCauThu], [TenDoiBong], [TenCauThu], [LoaiCauThu], [TongSoBanThang], [NgaySinh], [GhiChu]) VALUES (N'2', N'HAGL', N'Duc', N'Nội binh', 1, CAST(N'2003-02-01' AS Date), NULL)
INSERT [dbo].[CauThu] ([MaCauThu], [TenDoiBong], [TenCauThu], [LoaiCauThu], [TongSoBanThang], [NgaySinh], [GhiChu]) VALUES (N'2', N'SLNA', N'Vinh', N'Nội binh', 0, CAST(N'2001-03-02' AS Date), NULL)
INSERT [dbo].[CauThu] ([MaCauThu], [TenDoiBong], [TenCauThu], [LoaiCauThu], [TongSoBanThang], [NgaySinh], [GhiChu]) VALUES (N'3', N'HAGL', N'Vu', N'Ngoại binh', 5, CAST(N'2001-02-04' AS Date), NULL)
INSERT [dbo].[CauThu] ([MaCauThu], [TenDoiBong], [TenCauThu], [LoaiCauThu], [TongSoBanThang], [NgaySinh], [GhiChu]) VALUES (N'3', N'SLNA', N'Vu', N'Ngoại binh', 1, CAST(N'2004-03-02' AS Date), NULL)
GO
SET IDENTITY_INSERT [dbo].[DoiBong] ON 

INSERT [dbo].[DoiBong] ([MaDoiBong], [TenDoiBong], [SanNha], [SoTranThang], [SoTranHoa], [SoTranThua], [HieuSo], [Diem], [Hang]) VALUES (1, N'SLNA', N'Vinh', 7, 2, 1, NULL, 23, NULL)
INSERT [dbo].[DoiBong] ([MaDoiBong], [TenDoiBong], [SanNha], [SoTranThang], [SoTranHoa], [SoTranThua], [HieuSo], [Diem], [Hang]) VALUES (2, N'HAGL', N'Pleiku', 6, 7, 8, NULL, 25, NULL)
SET IDENTITY_INSERT [dbo].[DoiBong] OFF
GO
INSERT [dbo].[QuyDinh] ([DoTuoi_Min], [DoTuoi_Max], [SoCauThu_Min], [SoCauThu_Max], [SoCauThuNuocNgoai_Max], [ThoiDiemGhiBan_Max], [DiemSoThang], [DiemSoHoa], [DiemSoThua]) VALUES (18, 40, NULL, 2, 1, NULL, 3, 1, 0)
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [unique_SanNha]    Script Date: 27/12/2023 11:01:07 PM ******/
ALTER TABLE [dbo].[DoiBong] ADD  CONSTRAINT [unique_SanNha] UNIQUE NONCLUSTERED 
(
	[SanNha] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [unique_TenDoi]    Script Date: 27/12/2023 11:01:07 PM ******/
ALTER TABLE [dbo].[DoiBong] ADD  CONSTRAINT [unique_TenDoi] UNIQUE NONCLUSTERED 
(
	[TenDoiBong] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[BanThang]  WITH CHECK ADD  CONSTRAINT [FK_BanThang_CauThu] FOREIGN KEY([CauThu], [TenDoiBong])
REFERENCES [dbo].[CauThu] ([MaCauThu], [TenDoiBong])
GO
ALTER TABLE [dbo].[BanThang] CHECK CONSTRAINT [FK_BanThang_CauThu]
GO
ALTER TABLE [dbo].[BanThang]  WITH CHECK ADD  CONSTRAINT [FK_BanThang_TranDau] FOREIGN KEY([MaTranDau], [VongDau])
REFERENCES [dbo].[TranDau] ([MaTranDau], [VongDau])
GO
ALTER TABLE [dbo].[BanThang] CHECK CONSTRAINT [FK_BanThang_TranDau]
GO
ALTER TABLE [dbo].[CauThu]  WITH CHECK ADD  CONSTRAINT [FK_CauThu_DoiBong] FOREIGN KEY([TenDoiBong])
REFERENCES [dbo].[DoiBong] ([TenDoiBong])
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
USE [master]
GO
ALTER DATABASE [V_League] SET  READ_WRITE 
GO
