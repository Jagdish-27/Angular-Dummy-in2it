import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataSet, Network } from 'vis';

@Component({
  selector: 'app-vis-network',
  templateUrl: './vis-network.component.html',
  styleUrls: ['./vis-network.component.css'],
})
export class VisNetworkComponent implements OnInit {
  @ViewChild('network', { static: true }) networkContainer!: ElementRef;

  private network!: Network;
  private allSites: any[] = [];
  private nodes = new DataSet<any>();
  private edges = new DataSet<any>();
  private expandedSites = new Set<number>();

  // For tracking drag start positions of rect nodes
  private dragStartPos: { [nodeId: string]: { x: number; y: number } } = {};
  rawData = [
    {
      id: 509,
      name: 'P Site01',
      devices: [
        {
          id: 499,
          name: 'GPN-0105_NOK-NGW-CLI_NE8-01',
          devicetype: {
            id: 193,
            name: 'NetEngine 8000 M14',
          },
          device_role: {
            id: 4,
            name: 'P1',
          },
          haveLink: true,
          cordinate: 0,
          height: 40,
          x: 601,
          y: 30,
          imageCordinate: {
            x: 596,
            y: 25,
          },
          textCordinate: {
            x: 577,
            y: 45,
          },
          image: {
            url: 'data:image/svg;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAD3UlEQVR4AaRUbWyNZxi+nuedlsqw1tpVg6wWNizrOp1l9sEWMoslltl+dMu2RPa98kOIIEGiEm3ER4uEX8R3hMQPEkRFIrTlB0VPaRBV1fbQj9MP2r7ncd/3e87rOefQVLy5n+e5P677up/PV6Of77/15eMLiiqXLSiqPFFQXHG/oKiiTxrp4qMYY/qhwHMLcNL/ReV7tKtqAFNoYGbCIJOIHGmki49ijGEs51AsQRIK0Ez/oKTrCio/Af0CB2M5h3PjITEFCmjJNNPtBOKZ0vBS4nCucFhpfgGvuim0YgNWhw0dhNEZQyN4U+hxeaYUkP0z2Oa5gPxv3kbxwlys/usDLP19EmZPy4qG/DErPQUr5r+PzYvzsObfHMyf+44fo5VsE07ySAHlYiXp/rY87nGRnOTgjWFJGPF6EsoqH1A4VuqbuhBsfeI7Q529vk6KE+GE5koq7kBb2p8lpgx+DT/NGgtFWbZ8lfcWJmYP913tsQUIr/KZW2tXz/NREaU11IvWUA+aHj0Wz5T30vDjzLGiczfrk1GYO300qwh19eJUeQPiViAx5tY0s+liWd2Nu+1Yt/MaNu8PoPFht0Q+y0mXs/hwQirmfO6dSVtHDzburcbRs/dw7Fy94OyOubVRZrLtZL2zuw/ceNkb9wVkJWFjcLu+A1dqW2Rk8g17qtHc4m0nYznXbsytYZBuO+N1LrSBZrnjcC0Cd9rgugZbD9WgeNd1PGrviYfH2sQttyjWm2jN/jQL03LehFa0aAqPGpkCPgfPIkc/oum4m/qJ4/sZY/BFbjomjxtBpJnISB2Mv+eNF98v32ZTOl78KTRpZdTVeETuu6ngm/PD12MwY0qGhHmvz11uBu91MHL/8yal4bfvxmFIsiMFBWh1zK0NcAZxX+bIIfh1Tja+zPXImbT0YECuZPcTF6UHAqhr7JQsnswqevEf0VUWh9Uxtw474UOWT9S04ckyctfR1YdN+6rRYh0oFynZXwN+zYzhFfD/iHW7MbfesmjqDQOz1w7YBRxHwbajODds0Ec3KmrzLyWq88iczK3FcLCaRpeayIWqIA6fvovdx29j97FbaAh6j02CkS5pkMaJC/dRQo+x7OIDeRvRW0YQ13ickAJcCQr/UEDkfFUzzlxqRMXVIKpqW9HWEfMjEwy/D47drAvhSFmdvHp+jBIkLuEkQwrQiJLFH+8A1HK88qeWe1wekV+AzZIleWtpJX+S7m8X6QMVl3OFw8qIKcB+rh52zEQ+JLYH0hjLOZwbj08owADev9IlU3+mpAmgbVNQJ2l2DQBcaQoN4qMYYxjLORRLkKcAAAD//14d9HAAAAAGSURBVAMA2A2aSkD9o1UAAAAASUVORK5CYII=',
            deviceType: 'isRouter',
          },
          wrapName: 'GPN-0105_NOK...',
        },
        {
          id: 471,
          name: '"GPN-0053_WES-WOR_NE8-01"',
          devicetype: {
            id: 4,
            name: 'NE80006',
          },
          device_role: {
            id: 4,
            name: 'P1',
          },
          cordinate: 3.141592653589793,
          height: 40,
          x: 521,
          y: 30,
          imageCordinate: {
            x: 516,
            y: 25,
          },
          textCordinate: {
            x: 497,
            y: 45,
          },
          image: {
            url: 'data:image/svg;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAD3UlEQVR4AaRUbWyNZxi+nuedlsqw1tpVg6wWNizrOp1l9sEWMoslltl+dMu2RPa98kOIIEGiEm3ER4uEX8R3hMQPEkRFIrTlB0VPaRBV1fbQj9MP2r7ncd/3e87rOefQVLy5n+e5P677up/PV6Of77/15eMLiiqXLSiqPFFQXHG/oKiiTxrp4qMYY/qhwHMLcNL/ReV7tKtqAFNoYGbCIJOIHGmki49ijGEs51AsQRIK0Ez/oKTrCio/Af0CB2M5h3PjITEFCmjJNNPtBOKZ0vBS4nCucFhpfgGvuim0YgNWhw0dhNEZQyN4U+hxeaYUkP0z2Oa5gPxv3kbxwlys/usDLP19EmZPy4qG/DErPQUr5r+PzYvzsObfHMyf+44fo5VsE07ySAHlYiXp/rY87nGRnOTgjWFJGPF6EsoqH1A4VuqbuhBsfeI7Q529vk6KE+GE5koq7kBb2p8lpgx+DT/NGgtFWbZ8lfcWJmYP913tsQUIr/KZW2tXz/NREaU11IvWUA+aHj0Wz5T30vDjzLGiczfrk1GYO300qwh19eJUeQPiViAx5tY0s+liWd2Nu+1Yt/MaNu8PoPFht0Q+y0mXs/hwQirmfO6dSVtHDzburcbRs/dw7Fy94OyOubVRZrLtZL2zuw/ceNkb9wVkJWFjcLu+A1dqW2Rk8g17qtHc4m0nYznXbsytYZBuO+N1LrSBZrnjcC0Cd9rgugZbD9WgeNd1PGrviYfH2sQttyjWm2jN/jQL03LehFa0aAqPGpkCPgfPIkc/oum4m/qJ4/sZY/BFbjomjxtBpJnISB2Mv+eNF98v32ZTOl78KTRpZdTVeETuu6ngm/PD12MwY0qGhHmvz11uBu91MHL/8yal4bfvxmFIsiMFBWh1zK0NcAZxX+bIIfh1Tja+zPXImbT0YECuZPcTF6UHAqhr7JQsnswqevEf0VUWh9Uxtw474UOWT9S04ckyctfR1YdN+6rRYh0oFynZXwN+zYzhFfD/iHW7MbfesmjqDQOz1w7YBRxHwbajODds0Ec3KmrzLyWq88iczK3FcLCaRpeayIWqIA6fvovdx29j97FbaAh6j02CkS5pkMaJC/dRQo+x7OIDeRvRW0YQ13ickAJcCQr/UEDkfFUzzlxqRMXVIKpqW9HWEfMjEwy/D47drAvhSFmdvHp+jBIkLuEkQwrQiJLFH+8A1HK88qeWe1wekV+AzZIleWtpJX+S7m8X6QMVl3OFw8qIKcB+rh52zEQ+JLYH0hjLOZwbj08owADev9IlU3+mpAmgbVNQJ2l2DQBcaQoN4qMYYxjLORRLkKcAAAD//14d9HAAAAAGSURBVAMA2A2aSkD9o1UAAAAASUVORK5CYII=',
            deviceType: 'isRouter',
          },
          wrapName: '"GPN-0053_WE...',
        },
      ],
      circuits_details: [
        {
          a_end: {
            site: {
              id: 509,
              name: 'P Site01',
            },
            device: {
              id: 499,
              name: 'GPN-0105_NOK-NGW-CLI_NE8-01',
            },
            model: {
              id: 193,
              name: 'NetEngine 8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 17140,
              name: 'GigabitEthernet0/5/1',
            },
            ip_address: {
              id: 4274,
              name: '124.0.0.0/28',
            },
          },
          circuit: {
            id: 134,
            name: 'CNAMETest001',
            circuit_ID: 'CIDTest001',
            provider: {
              id: 2,
              name: 'BBI',
            },
            commit_rate: null,
            tenant: {
              id: 224,
              name: '14th Aug Org',
            },
            lldp_cdp: false,
            ldp: false,
            bandwidth: 1000,
            bandwidth_unit: 'Gbps',
            mtu: 1500,
            media: 'Optical',
            load_interval: 300,
            created: '2025-08-14T06:08:28.582Z',
          },
          z_end: {
            site: {
              id: 510,
              name: 'P Site02',
            },
            device: {
              id: 501,
              name: 'GPN-0105_NOK-NGW-CLI_U65-01',
            },
            model: {
              id: 144,
              name: 'NE8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 17387,
              name: 'GigabitEthernet0/13/1',
            },
            ip_address: {
              id: 4275,
              name: '124.0.0.1/28',
            },
          },
        },
        {
          core_link_type: 'Ring',
          ring: {
            id: 2,
            name: 'GPNRing',
          },
          circuit: {
            id: 134,
            name: 'CNAMETest001',
            circuit_ID: 'CIDTest001',
            provider: {
              id: 2,
              name: 'BBI',
            },
            commit_rate: null,
            tenant: {
              id: 224,
              name: '14th Aug Org',
            },
            lldp_cdp: false,
            ldp: false,
            bandwidth: 1000,
            bandwidth_unit: 'Gbps',
            mtu: 1500,
            media: 'Optical',
            load_interval: 300,
            created: '2025-08-14T06:08:28.582Z',
          },
          a_end: {
            site: {
              id: 509,
              name: 'P Site01',
            },
            device: {
              id: 499,
              name: 'GPN-0105_NOK-NGW-CLI_NE8-01',
            },
            model: {
              id: 193,
              name: 'NetEngine 8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 17140,
              name: 'GigabitEthernet0/5/1',
            },
            ip_address: {
              id: 4274,
              name: '124.0.0.0/28',
            },
          },
          z_end: {
            site: {
              id: 510,
              name: 'P Site02',
            },
            device: {
              id: 501,
              name: 'GPN-0105_NOK-NGW-CLI_U65-01',
            },
            model: {
              id: 144,
              name: 'NE8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 17387,
              name: 'GigabitEthernet0/13/1',
            },
            ip_address: {
              id: 4275,
              name: '124.0.0.1/28',
            },
          },
        },
        {
          a_end: {
            site: {
              id: 511,
              name: 'P Site05',
            },
            device: {
              id: 496,
              name: '"GPN-0107_HEL-JOS-HOS_NE8-01"',
            },
            model: {
              id: 144,
              name: 'NE8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 16561,
              name: 'GigabitEthernet0/5/3',
            },
            ip_address: {
              id: 4326,
              name: '124.0.0.41/28',
            },
          },
          circuit: {
            id: 138,
            name: 'CIDNAME006',
            circuit_ID: 'CIDTest006',
            provider: {
              id: 2,
              name: 'BBI',
            },
            commit_rate: null,
            tenant: {
              id: 224,
              name: '14th Aug Org',
            },
            lldp_cdp: false,
            ldp: false,
            bandwidth: 100,
            bandwidth_unit: 'Gbps',
            mtu: 1500,
            media: 'Optical',
            load_interval: 300,
            created: '2025-08-14T06:17:12.837Z',
          },
          z_end: {
            site: {
              id: 509,
              name: 'P Site01',
            },
            device: {
              id: 499,
              name: 'GPN-0105_NOK-NGW-CLI_NE8-01',
            },
            model: {
              id: 193,
              name: 'NetEngine 8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 17143,
              name: 'GigabitEthernet0/5/4',
            },
            ip_address: {
              id: 4325,
              name: '124.0.0.40/28',
            },
          },
        },
        {
          core_link_type: 'Ring',
          ring: {
            id: 2,
            name: 'GPNRing',
          },
          circuit: {
            id: 138,
            name: 'CIDNAME006',
            circuit_ID: 'CIDTest006',
            provider: {
              id: 2,
              name: 'BBI',
            },
            commit_rate: null,
            tenant: {
              id: 224,
              name: '14th Aug Org',
            },
            lldp_cdp: false,
            ldp: false,
            bandwidth: 100,
            bandwidth_unit: 'Gbps',
            mtu: 1500,
            media: 'Optical',
            load_interval: 300,
            created: '2025-08-14T06:17:12.837Z',
          },
          a_end: {
            site: {
              id: 511,
              name: 'P Site05',
            },
            device: {
              id: 496,
              name: '"GPN-0107_HEL-JOS-HOS_NE8-01"',
            },
            model: {
              id: 144,
              name: 'NE8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 16561,
              name: 'GigabitEthernet0/5/3',
            },
            ip_address: {
              id: 4326,
              name: '124.0.0.41/28',
            },
          },
          z_end: {
            site: {
              id: 509,
              name: 'P Site01',
            },
            device: {
              id: 499,
              name: 'GPN-0105_NOK-NGW-CLI_NE8-01',
            },
            model: {
              id: 193,
              name: 'NetEngine 8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 17143,
              name: 'GigabitEthernet0/5/4',
            },
            ip_address: {
              id: 4325,
              name: '124.0.0.40/28',
            },
          },
        },
      ],
      cordinate: 4.537856055185257,
      height: 450,
      x2: 561,
      y2: 30,
      x1: 639.5,
      y1: 473,
      imageCordinate: {
        x: 556,
        y: 25,
      },
      textCordinate: {
        x: 545,
        y: 55,
      },
      wrapName: 'P Site01',
      dependentDevice: 2,
      circuits: [
        {
          x1: 984,
          y1: 187,
          x2: 601,
          y2: 33,
          deviceTo: 496,
          a_end_Interface: 'GigabitEthernet0/5/3',
          a_end_Ip: '124.0.0.41/28',
          z_end_Interface: 'GigabitEthernet0/5/4',
          z_end_Ip: '124.0.0.40/28',
          deviceFrom: 499,
          circuit: {
            id: 138,
            name: 'CIDNAME006',
            circuit_ID: 'CIDTest006',
            provider: {
              id: 2,
              name: 'BBI',
            },
            commit_rate: null,
            tenant: {
              id: 224,
              name: '14th Aug Org',
            },
            lldp_cdp: false,
            ldp: false,
            bandwidth: 100,
            bandwidth_unit: 'Gbps',
            mtu: 1500,
            media: 'Optical',
            load_interval: 300,
            created: '2025-08-14T06:17:12.837Z',
          },
          dom: {
            x: 556,
            y: 25,
          },
        },
      ],
      haveCircuit: true,
      showDevice: true,
      deviceView: true,
      rect: {
        x: 491,
        y: 10,
        height: 50,
        width: 150,
      },
      cross: {
        x: 631,
        y: 5,
      },
    },

    {
      id: 510,
      name: 'P Site02',
      devices: [
        {
          id: 501,
          name: 'GPN-0105_NOK-NGW-CLI_U65-01',
          devicetype: {
            id: 144,
            name: 'NE8000 M14',
          },
          device_role: {
            id: 5,
            name: 'PE1',
          },
          haveLink: true,
          cordinate: 0,
          height: 40,
          x: 864,
          y: 83,
          imageCordinate: {
            x: 859,
            y: 78,
          },
          textCordinate: {
            x: 840,
            y: 98,
          },
          image: {
            url: 'data:image/svg;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAD3UlEQVR4AaRUbWyNZxi+nuedlsqw1tpVg6wWNizrOp1l9sEWMoslltl+dMu2RPa98kOIIEGiEm3ER4uEX8R3hMQPEkRFIrTlB0VPaRBV1fbQj9MP2r7ncd/3e87rOefQVLy5n+e5P677up/PV6Of77/15eMLiiqXLSiqPFFQXHG/oKiiTxrp4qMYY/qhwHMLcNL/ReV7tKtqAFNoYGbCIJOIHGmki49ijGEs51AsQRIK0Ez/oKTrCio/Af0CB2M5h3PjITEFCmjJNNPtBOKZ0vBS4nCucFhpfgGvuim0YgNWhw0dhNEZQyN4U+hxeaYUkP0z2Oa5gPxv3kbxwlys/usDLP19EmZPy4qG/DErPQUr5r+PzYvzsObfHMyf+44fo5VsE07ySAHlYiXp/rY87nGRnOTgjWFJGPF6EsoqH1A4VuqbuhBsfeI7Q529vk6KE+GE5koq7kBb2p8lpgx+DT/NGgtFWbZ8lfcWJmYP913tsQUIr/KZW2tXz/NREaU11IvWUA+aHj0Wz5T30vDjzLGiczfrk1GYO300qwh19eJUeQPiViAx5tY0s+liWd2Nu+1Yt/MaNu8PoPFht0Q+y0mXs/hwQirmfO6dSVtHDzburcbRs/dw7Fy94OyOubVRZrLtZL2zuw/ceNkb9wVkJWFjcLu+A1dqW2Rk8g17qtHc4m0nYznXbsytYZBuO+N1LrSBZrnjcC0Cd9rgugZbD9WgeNd1PGrviYfH2sQttyjWm2jN/jQL03LehFa0aAqPGpkCPgfPIkc/oum4m/qJ4/sZY/BFbjomjxtBpJnISB2Mv+eNF98v32ZTOl78KTRpZdTVeETuu6ngm/PD12MwY0qGhHmvz11uBu91MHL/8yal4bfvxmFIsiMFBWh1zK0NcAZxX+bIIfh1Tja+zPXImbT0YECuZPcTF6UHAqhr7JQsnswqevEf0VUWh9Uxtw474UOWT9S04ckyctfR1YdN+6rRYh0oFynZXwN+zYzhFfD/iHW7MbfesmjqDQOz1w7YBRxHwbajODds0Ec3KmrzLyWq88iczK3FcLCaRpeayIWqIA6fvovdx29j97FbaAh6j02CkS5pkMaJC/dRQo+x7OIDeRvRW0YQ13ickAJcCQr/UEDkfFUzzlxqRMXVIKpqW9HWEfMjEwy/D47drAvhSFmdvHp+jBIkLuEkQwrQiJLFH+8A1HK88qeWe1wekV+AzZIleWtpJX+S7m8X6QMVl3OFw8qIKcB+rh52zEQ+JLYH0hjLOZwbj08owADev9IlU3+mpAmgbVNQJ2l2DQBcaQoN4qMYYxjLORRLkKcAAAD//14d9HAAAAAGSURBVAMA2A2aSkD9o1UAAAAASUVORK5CYII=',
            deviceType: 'isRouter',
          },
          wrapName: 'GPN-0105_NOK...',
        },
      ],
      circuits_details: [
        {
          a_end: {
            site: {
              id: 509,
              name: 'P Site01',
            },
            device: {
              id: 499,
              name: 'GPN-0105_NOK-NGW-CLI_NE8-01',
            },
            model: {
              id: 193,
              name: 'NetEngine 8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 17140,
              name: 'GigabitEthernet0/5/1',
            },
            ip_address: {
              id: 4274,
              name: '124.0.0.0/28',
            },
          },
          circuit: null,
          z_end: null,
        },
        {
          core_link_type: 'Ring',
          ring: {
            id: 2,
            name: 'GPNRing',
          },
          circuit: {
            id: 134,
            name: 'CNAMETest001',
            circuit_ID: 'CIDTest001',
            provider: {
              id: 2,
              name: 'BBI',
            },
            commit_rate: null,
            tenant: {
              id: 224,
              name: '14th Aug Org',
            },
            lldp_cdp: false,
            ldp: false,
            bandwidth: 1000,
            bandwidth_unit: 'Gbps',
            mtu: 1500,
            media: 'Optical',
            load_interval: 300,
            created: '2025-08-14T06:08:28.582Z',
          },
          a_end: {
            site: {
              id: 509,
              name: 'P Site01',
            },
            device: {
              id: 499,
              name: 'GPN-0105_NOK-NGW-CLI_NE8-01',
            },
            model: {
              id: 193,
              name: 'NetEngine 8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 17140,
              name: 'GigabitEthernet0/5/1',
            },
            ip_address: {
              id: 4274,
              name: '124.0.0.0/28',
            },
          },
          z_end: {
            site: {
              id: 510,
              name: 'P Site02',
            },
            device: {
              id: 501,
              name: 'GPN-0105_NOK-NGW-CLI_U65-01',
            },
            model: {
              id: 144,
              name: 'NE8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 17387,
              name: 'GigabitEthernet0/13/1',
            },
            ip_address: {
              id: 4275,
              name: '124.0.0.1/28',
            },
          },
        },
        {
          a_end: {
            site: {
              id: 510,
              name: 'P Site02',
            },
            device: {
              id: 501,
              name: 'GPN-0105_NOK-NGW-CLI_U65-01',
            },
            model: {
              id: 144,
              name: 'NE8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 17388,
              name: 'GigabitEthernet0/13/2',
            },
            ip_address: {
              id: 4318,
              name: '124.0.0.33/28',
            },
          },
          circuit: {
            id: 135,
            name: 'CNameTest002',
            circuit_ID: 'CIDTest002',
            provider: {
              id: 2,
              name: 'BBI',
            },
            commit_rate: null,
            tenant: {
              id: 224,
              name: '14th Aug Org',
            },
            lldp_cdp: false,
            ldp: false,
            bandwidth: 1000,
            bandwidth_unit: 'Gbps',
            mtu: 1500,
            media: 'Optical',
            load_interval: 300,
            created: '2025-08-14T06:12:58.209Z',
          },
          z_end: {
            site: {
              id: 512,
              name: 'P Site03',
            },
            device: {
              id: 497,
              name: 'TopologyDevice01',
            },
            model: {
              id: 193,
              name: 'NetEngine 8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 16637,
              name: 'GigabitEthernet0/5/0',
            },
            ip_address: {
              id: 4319,
              name: '124.0.0.34/28',
            },
          },
        },
        {
          core_link_type: 'Ring',
          ring: {
            id: 2,
            name: 'GPNRing',
          },
          circuit: {
            id: 135,
            name: 'CNameTest002',
            circuit_ID: 'CIDTest002',
            provider: {
              id: 2,
              name: 'BBI',
            },
            commit_rate: null,
            tenant: {
              id: 224,
              name: '14th Aug Org',
            },
            lldp_cdp: false,
            ldp: false,
            bandwidth: 1000,
            bandwidth_unit: 'Gbps',
            mtu: 1500,
            media: 'Optical',
            load_interval: 300,
            created: '2025-08-14T06:12:58.209Z',
          },
          a_end: {
            site: {
              id: 510,
              name: 'P Site02',
            },
            device: {
              id: 501,
              name: 'GPN-0105_NOK-NGW-CLI_U65-01',
            },
            model: {
              id: 144,
              name: 'NE8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 17388,
              name: 'GigabitEthernet0/13/2',
            },
            ip_address: {
              id: 4318,
              name: '124.0.0.33/28',
            },
          },
          z_end: {
            site: {
              id: 512,
              name: 'P Site03',
            },
            device: {
              id: 497,
              name: 'TopologyDevice01',
            },
            model: {
              id: 193,
              name: 'NetEngine 8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 16637,
              name: 'GigabitEthernet0/5/0',
            },
            ip_address: {
              id: 4319,
              name: '124.0.0.34/28',
            },
          },
        },
      ],
      cordinate: 5.235987755982988,
      height: 450,
      x2: 864,
      y2: 83,
      x1: 639.5,
      y1: 473,
      imageCordinate: {
        x: 859,
        y: 78,
      },
      textCordinate: {
        x: 848,
        y: 108,
      },
      wrapName: 'P Site02',
      dependentDevice: 1,
      circuits: [
        {
          x1: 601,
          y1: 33,
          x2: 864,
          y2: 86,
          deviceTo: 499,
          a_end_Interface: 'GigabitEthernet0/5/1',
          a_end_Ip: '124.0.0.0/28',
          z_end_Interface: 'GigabitEthernet0/13/1',
          z_end_Ip: '124.0.0.1/28',
          deviceFrom: 501,
          circuit: {
            id: 134,
            name: 'CNAMETest001',
            circuit_ID: 'CIDTest001',
            provider: {
              id: 2,
              name: 'BBI',
            },
            commit_rate: null,
            tenant: {
              id: 224,
              name: '14th Aug Org',
            },
            lldp_cdp: false,
            ldp: false,
            bandwidth: 1000,
            bandwidth_unit: 'Gbps',
            mtu: 1500,
            media: 'Optical',
            load_interval: 300,
            created: '2025-08-14T06:08:28.582Z',
          },
          core_link_type: 'Ring',
          dom: {
            x: 859,
            y: 78,
          },
        },
      ],
      haveCircuit: true,
      showDevice: true,
      deviceView: true,
      rect: {
        x: 824,
        y: 68,
        height: 40,
        width: 80,
      },
      cross: {
        x: 894,
        y: 63,
      },
    },
    {
      id: 512,
      name: 'P Site03',
      devices: [
        {
          id: 497,
          name: 'TopologyDevice01',
          devicetype: {
            id: 193,
            name: 'NetEngine 8000 M14',
          },
          device_role: {
            id: 4,
            name: 'P1',
          },
          haveLink: true,
          cordinate: 0,
          height: 40,
          x: 1062,
          y: 319,
          imageCordinate: {
            x: 1057,
            y: 314,
          },
          textCordinate: {
            x: 1038,
            y: 334,
          },
          image: {
            url: 'data:image/svg;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAD3UlEQVR4AaRUbWyNZxi+nuedlsqw1tpVg6wWNizrOp1l9sEWMoslltl+dMu2RPa98kOIIEGiEm3ER4uEX8R3hMQPEkRFIrTlB0VPaRBV1fbQj9MP2r7ncd/3e87rOefQVLy5n+e5P677up/PV6Of77/15eMLiiqXLSiqPFFQXHG/oKiiTxrp4qMYY/qhwHMLcNL/ReV7tKtqAFNoYGbCIJOIHGmki49ijGEs51AsQRIK0Ez/oKTrCio/Af0CB2M5h3PjITEFCmjJNNPtBOKZ0vBS4nCucFhpfgGvuim0YgNWhw0dhNEZQyN4U+hxeaYUkP0z2Oa5gPxv3kbxwlys/usDLP19EmZPy4qG/DErPQUr5r+PzYvzsObfHMyf+44fo5VsE07ySAHlYiXp/rY87nGRnOTgjWFJGPF6EsoqH1A4VuqbuhBsfeI7Q529vk6KE+GE5koq7kBb2p8lpgx+DT/NGgtFWbZ8lfcWJmYP913tsQUIr/KZW2tXz/NREaU11IvWUA+aHj0Wz5T30vDjzLGiczfrk1GYO300qwh19eJUeQPiViAx5tY0s+liWd2Nu+1Yt/MaNu8PoPFht0Q+y0mXs/hwQirmfO6dSVtHDzburcbRs/dw7Fy94OyOubVRZrLtZL2zuw/ceNkb9wVkJWFjcLu+A1dqW2Rk8g17qtHc4m0nYznXbsytYZBuO+N1LrSBZrnjcC0Cd9rgugZbD9WgeNd1PGrviYfH2sQttyjWm2jN/jQL03LehFa0aAqPGpkCPgfPIkc/oum4m/qJ4/sZY/BFbjomjxtBpJnISB2Mv+eNF98v32ZTOl78KTRpZdTVeETuu6ngm/PD12MwY0qGhHmvz11uBu91MHL/8yal4bfvxmFIsiMFBWh1zK0NcAZxX+bIIfh1Tja+zPXImbT0YECuZPcTF6UHAqhr7JQsnswqevEf0VUWh9Uxtw474UOWT9S04ckyctfR1YdN+6rRYh0oFynZXwN+zYzhFfD/iHW7MbfesmjqDQOz1w7YBRxHwbajODds0Ec3KmrzLyWq88iczK3FcLCaRpeayIWqIA6fvovdx29j97FbaAh6j02CkS5pkMaJC/dRQo+x7OIDeRvRW0YQ13ickAJcCQr/UEDkfFUzzlxqRMXVIKpqW9HWEfMjEwy/D47drAvhSFmdvHp+jBIkLuEkQwrQiJLFH+8A1HK88qeWe1wekV+AzZIleWtpJX+S7m8X6QMVl3OFw8qIKcB+rh52zEQ+JLYH0hjLOZwbj08owADev9IlU3+mpAmgbVNQJ2l2DQBcaQoN4qMYYxjLORRLkKcAAAD//14d9HAAAAAGSURBVAMA2A2aSkD9o1UAAAAASUVORK5CYII=',
            deviceType: 'isRouter',
          },
          wrapName: 'TopologyDevi...',
        },
      ],
      circuits_details: [
        {
          a_end: {
            site: {
              id: 510,
              name: 'P Site02',
            },
            device: {
              id: 501,
              name: 'GPN-0105_NOK-NGW-CLI_U65-01',
            },
            model: {
              id: 144,
              name: 'NE8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 17388,
              name: 'GigabitEthernet0/13/2',
            },
            ip_address: {
              id: 4318,
              name: '124.0.0.33/28',
            },
          },
          circuit: null,
          z_end: null,
        },
        {
          core_link_type: 'Ring',
          ring: {
            id: 2,
            name: 'GPNRing',
          },
          circuit: {
            id: 135,
            name: 'CNameTest002',
            circuit_ID: 'CIDTest002',
            provider: {
              id: 2,
              name: 'BBI',
            },
            commit_rate: null,
            tenant: {
              id: 224,
              name: '14th Aug Org',
            },
            lldp_cdp: false,
            ldp: false,
            bandwidth: 1000,
            bandwidth_unit: 'Gbps',
            mtu: 1500,
            media: 'Optical',
            load_interval: 300,
            created: '2025-08-14T06:12:58.209Z',
          },
          a_end: {
            site: {
              id: 510,
              name: 'P Site02',
            },
            device: {
              id: 501,
              name: 'GPN-0105_NOK-NGW-CLI_U65-01',
            },
            model: {
              id: 144,
              name: 'NE8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 17388,
              name: 'GigabitEthernet0/13/2',
            },
            ip_address: {
              id: 4318,
              name: '124.0.0.33/28',
            },
          },
          z_end: {
            site: {
              id: 512,
              name: 'P Site03',
            },
            device: {
              id: 497,
              name: 'TopologyDevice01',
            },
            model: {
              id: 193,
              name: 'NetEngine 8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 16637,
              name: 'GigabitEthernet0/5/0',
            },
            ip_address: {
              id: 4319,
              name: '124.0.0.34/28',
            },
          },
        },
        {
          a_end: {
            site: {
              id: 512,
              name: 'P Site03',
            },
            device: {
              id: 497,
              name: 'TopologyDevice01',
            },
            model: {
              id: 193,
              name: 'NetEngine 8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 16639,
              name: 'GigabitEthernet0/5/2',
            },
            ip_address: {
              id: 4321,
              name: '124.0.0.36/28',
            },
          },
          circuit: null,
          z_end: null,
        },
        {
          core_link_type: 'Ring',
          ring: {
            id: 2,
            name: 'GPNRing',
          },
          circuit: {
            id: 136,
            name: 'CNAMETest003',
            circuit_ID: 'CIDTest003',
            provider: {
              id: 2,
              name: 'BBI',
            },
            commit_rate: null,
            tenant: {
              id: 224,
              name: '14th Aug Org',
            },
            lldp_cdp: false,
            ldp: false,
            bandwidth: 100,
            bandwidth_unit: 'Gbps',
            mtu: 1500,
            media: 'Optical',
            load_interval: 300,
            created: '2025-08-14T06:14:33.200Z',
          },
          a_end: {
            site: {
              id: 512,
              name: 'P Site03',
            },
            device: {
              id: 497,
              name: 'TopologyDevice01',
            },
            model: {
              id: 193,
              name: 'NetEngine 8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 16639,
              name: 'GigabitEthernet0/5/2',
            },
            ip_address: {
              id: 4321,
              name: '124.0.0.36/28',
            },
          },
          z_end: {
            site: {
              id: 508,
              name: 'P Site04',
            },
            device: {
              id: 498,
              name: 'TDevice01',
            },
            model: {
              id: 193,
              name: 'NetEngine 8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 16891,
              name: 'GigabitEthernet0/5/3',
            },
            ip_address: {
              id: 4320,
              name: '124.0.0.35/28',
            },
          },
        },
        {
          a_end: {
            site: {
              id: 512,
              name: 'P Site03',
            },
            device: {
              id: 497,
              name: 'TopologyDevice01',
            },
            model: {
              id: 193,
              name: 'NetEngine 8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 16632,
              name: 'Virtual-Template0',
            },
            ip_address: {
              id: 4160,
              name: '10.11.13.11/24',
            },
          },
          circuit: null,
          z_end: null,
        },
        {
          core_link_type: 'Core',
          ring: null,
          circuit: {
            id: 139,
            name: 'SDFGHJ',
            circuit_ID: '4564256+456',
            provider: {
              id: 2,
              name: 'BBI',
            },
            commit_rate: null,
            tenant: {
              id: 224,
              name: '14th Aug Org',
            },
            lldp_cdp: false,
            ldp: false,
            bandwidth: 1000,
            bandwidth_unit: 'Gbps',
            mtu: 1500,
            media: 'Electrical',
            load_interval: 300,
            created: '2025-08-19T09:32:36.749Z',
          },
          a_end: {
            site: {
              id: 512,
              name: 'P Site03',
            },
            device: {
              id: 497,
              name: 'TopologyDevice01',
            },
            model: {
              id: 193,
              name: 'NetEngine 8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 16632,
              name: 'Virtual-Template0',
            },
            ip_address: {
              id: 4160,
              name: '10.11.13.11/24',
            },
          },
          z_end: {
            site: {
              id: 495,
              name: 'site87',
            },
            device: {
              id: 478,
              name: 'Device_gpn_product',
            },
            model: {
              id: 144,
              name: 'NE8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 15690,
              name: 'LoopBack0',
            },
            ip_address: {
              id: 4180,
              name: '10.11.13.12/24',
            },
          },
        },
      ],
      cordinate: 5.934119456780721,
      height: 450,
      x2: 1062,
      y2: 319,
      x1: 639.5,
      y1: 473,
      imageCordinate: {
        x: 1057,
        y: 314,
      },
      textCordinate: {
        x: 1046,
        y: 344,
      },
      wrapName: 'P Site03',
      dependentDevice: 1,
      haveCircuit: true,
      circuits: [
        {
          x1: 864,
          y1: 86,
          x2: 1062,
          y2: 322,
          deviceTo: 501,
          a_end_Interface: 'GigabitEthernet0/13/2',
          a_end_Ip: '124.0.0.33/28',
          z_end_Interface: 'GigabitEthernet0/5/0',
          z_end_Ip: '124.0.0.34/28',
          deviceFrom: 497,
          circuit: {
            id: 135,
            name: 'CNameTest002',
            circuit_ID: 'CIDTest002',
            provider: {
              id: 2,
              name: 'BBI',
            },
            commit_rate: null,
            tenant: {
              id: 224,
              name: '14th Aug Org',
            },
            lldp_cdp: false,
            ldp: false,
            bandwidth: 1000,
            bandwidth_unit: 'Gbps',
            mtu: 1500,
            media: 'Optical',
            load_interval: 300,
            created: '2025-08-14T06:12:58.209Z',
          },
          core_link_type: 'Ring',
          dom: {
            x: 1057,
            y: 314,
          },
        },
      ],
      showDevice: true,
      deviceView: true,
      rect: {
        x: 1022,
        y: 304,
        height: 40,
        width: 80,
      },
      cross: {
        x: 1092,
        y: 299,
      },
    },
    {
      id: 508,
      name: 'P Site04',
      devices: [
        {
          id: 498,
          name: 'TDevice01',
          devicetype: {
            id: 193,
            name: 'NetEngine 8000 M14',
          },
          device_role: {
            id: 4,
            name: 'P1',
          },
          haveLink: true,
          cordinate: 0,
          height: 40,
          x: 718,
          y: 30,
          imageCordinate: {
            x: 713,
            y: 25,
          },
          textCordinate: {
            x: 695.5,
            y: 45,
          },
          image: {
            url: 'data:image/svg;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAD3UlEQVR4AaRUbWyNZxi+nuedlsqw1tpVg6wWNizrOp1l9sEWMoslltl+dMu2RPa98kOIIEGiEm3ER4uEX8R3hMQPEkRFIrTlB0VPaRBV1fbQj9MP2r7ncd/3e87rOefQVLy5n+e5P677up/PV6Of77/15eMLiiqXLSiqPFFQXHG/oKiiTxrp4qMYY/qhwHMLcNL/ReV7tKtqAFNoYGbCIJOIHGmki49ijGEs51AsQRIK0Ez/oKTrCio/Af0CB2M5h3PjITEFCmjJNNPtBOKZ0vBS4nCucFhpfgGvuim0YgNWhw0dhNEZQyN4U+hxeaYUkP0z2Oa5gPxv3kbxwlys/usDLP19EmZPy4qG/DErPQUr5r+PzYvzsObfHMyf+44fo5VsE07ySAHlYiXp/rY87nGRnOTgjWFJGPF6EsoqH1A4VuqbuhBsfeI7Q529vk6KE+GE5koq7kBb2p8lpgx+DT/NGgtFWbZ8lfcWJmYP913tsQUIr/KZW2tXz/NREaU11IvWUA+aHj0Wz5T30vDjzLGiczfrk1GYO300qwh19eJUeQPiViAx5tY0s+liWd2Nu+1Yt/MaNu8PoPFht0Q+y0mXs/hwQirmfO6dSVtHDzburcbRs/dw7Fy94OyOubVRZrLtZL2zuw/ceNkb9wVkJWFjcLu+A1dqW2Rk8g17qtHc4m0nYznXbsytYZBuO+N1LrSBZrnjcC0Cd9rgugZbD9WgeNd1PGrviYfH2sQttyjWm2jN/jQL03LehFa0aAqPGpkCPgfPIkc/oum4m/qJ4/sZY/BFbjomjxtBpJnISB2Mv+eNF98v32ZTOl78KTRpZdTVeETuu6ngm/PD12MwY0qGhHmvz11uBu91MHL/8yal4bfvxmFIsiMFBWh1zK0NcAZxX+bIIfh1Tja+zPXImbT0YECuZPcTF6UHAqhr7JQsnswqevEf0VUWh9Uxtw474UOWT9S04ckyctfR1YdN+6rRYh0oFynZXwN+zYzhFfD/iHW7MbfesmjqDQOz1w7YBRxHwbajODds0Ec3KmrzLyWq88iczK3FcLCaRpeayIWqIA6fvovdx29j97FbaAh6j02CkS5pkMaJC/dRQo+x7OIDeRvRW0YQ13ickAJcCQr/UEDkfFUzzlxqRMXVIKpqW9HWEfMjEwy/D47drAvhSFmdvHp+jBIkLuEkQwrQiJLFH+8A1HK88qeWe1wekV+AzZIleWtpJX+S7m8X6QMVl3OFw8qIKcB+rh52zEQ+JLYH0hjLOZwbj08owADev9IlU3+mpAmgbVNQJ2l2DQBcaQoN4qMYYxjLORRLkKcAAAD//14d9HAAAAAGSURBVAMA2A2aSkD9o1UAAAAASUVORK5CYII=',
            deviceType: 'isRouter',
          },
          wrapName: 'TDevice01',
        },
      ],
      circuits_details: [
        {
          a_end: {
            site: {
              id: 512,
              name: 'P Site03',
            },
            device: {
              id: 497,
              name: 'TopologyDevice01',
            },
            model: {
              id: 193,
              name: 'NetEngine 8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 16639,
              name: 'GigabitEthernet0/5/2',
            },
            ip_address: {
              id: 4321,
              name: '124.0.0.36/28',
            },
          },
          circuit: {
            id: 136,
            name: 'CNAMETest003',
            circuit_ID: 'CIDTest003',
            provider: {
              id: 2,
              name: 'BBI',
            },
            commit_rate: null,
            tenant: {
              id: 224,
              name: '14th Aug Org',
            },
            lldp_cdp: false,
            ldp: false,
            bandwidth: 100,
            bandwidth_unit: 'Gbps',
            mtu: 1500,
            media: 'Optical',
            load_interval: 300,
            created: '2025-08-14T06:14:33.200Z',
          },
          z_end: {
            site: {
              id: 508,
              name: 'P Site04',
            },
            device: {
              id: 498,
              name: 'TDevice01',
            },
            model: {
              id: 193,
              name: 'NetEngine 8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 16891,
              name: 'GigabitEthernet0/5/3',
            },
            ip_address: {
              id: 4320,
              name: '124.0.0.35/28',
            },
          },
        },
        {
          core_link_type: 'Ring',
          ring: {
            id: 2,
            name: 'GPNRing',
          },
          circuit: {
            id: 136,
            name: 'CNAMETest003',
            circuit_ID: 'CIDTest003',
            provider: {
              id: 2,
              name: 'BBI',
            },
            commit_rate: null,
            tenant: {
              id: 224,
              name: '14th Aug Org',
            },
            lldp_cdp: false,
            ldp: false,
            bandwidth: 100,
            bandwidth_unit: 'Gbps',
            mtu: 1500,
            media: 'Optical',
            load_interval: 300,
            created: '2025-08-14T06:14:33.200Z',
          },
          a_end: {
            site: {
              id: 512,
              name: 'P Site03',
            },
            device: {
              id: 497,
              name: 'TopologyDevice01',
            },
            model: {
              id: 193,
              name: 'NetEngine 8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 16639,
              name: 'GigabitEthernet0/5/2',
            },
            ip_address: {
              id: 4321,
              name: '124.0.0.36/28',
            },
          },
          z_end: {
            site: {
              id: 508,
              name: 'P Site04',
            },
            device: {
              id: 498,
              name: 'TDevice01',
            },
            model: {
              id: 193,
              name: 'NetEngine 8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 16891,
              name: 'GigabitEthernet0/5/3',
            },
            ip_address: {
              id: 4320,
              name: '124.0.0.35/28',
            },
          },
        },
        {
          a_end: {
            site: {
              id: 508,
              name: 'P Site04',
            },
            device: {
              id: 498,
              name: 'TDevice01',
            },
            model: {
              id: 193,
              name: 'NetEngine 8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 16888,
              name: 'GigabitEthernet0/5/0',
            },
            ip_address: {
              id: 4324,
              name: '124.0.0.39/28',
            },
          },
          circuit: {
            id: 137,
            name: 'CNAMETest005',
            circuit_ID: 'CIDTest005',
            provider: {
              id: 2,
              name: 'BBI',
            },
            commit_rate: null,
            tenant: {
              id: 224,
              name: '14th Aug Org',
            },
            lldp_cdp: false,
            ldp: false,
            bandwidth: 100,
            bandwidth_unit: 'Gbps',
            mtu: 1500,
            media: 'Optical',
            load_interval: 300,
            created: '2025-08-14T06:15:57.748Z',
          },
          z_end: {
            site: {
              id: 511,
              name: 'P Site05',
            },
            device: {
              id: 496,
              name: '"GPN-0107_HEL-JOS-HOS_NE8-01"',
            },
            model: {
              id: 144,
              name: 'NE8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 16551,
              name: 'GigabitEthernet0/13/1',
            },
            ip_address: {
              id: 4322,
              name: '124.0.0.37/28',
            },
          },
        },
        {
          core_link_type: 'Ring',
          ring: {
            id: 2,
            name: 'GPNRing',
          },
          circuit: {
            id: 137,
            name: 'CNAMETest005',
            circuit_ID: 'CIDTest005',
            provider: {
              id: 2,
              name: 'BBI',
            },
            commit_rate: null,
            tenant: {
              id: 224,
              name: '14th Aug Org',
            },
            lldp_cdp: false,
            ldp: false,
            bandwidth: 100,
            bandwidth_unit: 'Gbps',
            mtu: 1500,
            media: 'Optical',
            load_interval: 300,
            created: '2025-08-14T06:15:57.748Z',
          },
          a_end: {
            site: {
              id: 508,
              name: 'P Site04',
            },
            device: {
              id: 498,
              name: 'TDevice01',
            },
            model: {
              id: 193,
              name: 'NetEngine 8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 16888,
              name: 'GigabitEthernet0/5/0',
            },
            ip_address: {
              id: 4324,
              name: '124.0.0.39/28',
            },
          },
          z_end: {
            site: {
              id: 511,
              name: 'P Site05',
            },
            device: {
              id: 496,
              name: '"GPN-0107_HEL-JOS-HOS_NE8-01"',
            },
            model: {
              id: 144,
              name: 'NE8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 16551,
              name: 'GigabitEthernet0/13/1',
            },
            ip_address: {
              id: 4322,
              name: '124.0.0.37/28',
            },
          },
        },
      ],
      cordinate: 4.886921905584122,
      height: 450,
      x2: 718,
      y2: 30,
      x1: 639.5,
      y1: 473,
      imageCordinate: {
        x: 713,
        y: 25,
      },
      textCordinate: {
        x: 702,
        y: 55,
      },
      wrapName: 'P Site04',
      dependentDevice: 1,
      circuits: [
        {
          x1: 1062,
          y1: 322,
          x2: 718,
          y2: 33,
          deviceTo: 497,
          a_end_Interface: 'GigabitEthernet0/5/2',
          a_end_Ip: '124.0.0.36/28',
          z_end_Interface: 'GigabitEthernet0/5/3',
          z_end_Ip: '124.0.0.35/28',
          deviceFrom: 498,
          circuit: {
            id: 136,
            name: 'CNAMETest003',
            circuit_ID: 'CIDTest003',
            provider: {
              id: 2,
              name: 'BBI',
            },
            commit_rate: null,
            tenant: {
              id: 224,
              name: '14th Aug Org',
            },
            lldp_cdp: false,
            ldp: false,
            bandwidth: 100,
            bandwidth_unit: 'Gbps',
            mtu: 1500,
            media: 'Optical',
            load_interval: 300,
            created: '2025-08-14T06:14:33.200Z',
          },
          dom: {
            x: 713,
            y: 25,
          },
        },
      ],
      haveCircuit: true,
      showDevice: true,
      deviceView: true,
      rect: {
        x: 678,
        y: 15,
        height: 40,
        width: 80,
      },
      cross: {
        x: 748,
        y: 10,
      },
    },
    {
      id: 511,
      name: 'P Site05',
      devices: [
        {
          id: 496,
          name: '"GPN-0107_HEL-JOS-HOS_NE8-01"',
          devicetype: {
            id: 144,
            name: 'NE8000 M14',
          },
          device_role: {
            id: 4,
            name: 'P1',
          },
          haveLink: true,
          cordinate: 0,
          height: 40,
          x: 984,
          y: 184,
          imageCordinate: {
            x: 979,
            y: 179,
          },
          textCordinate: {
            x: 960,
            y: 199,
          },
          image: {
            url: 'data:image/svg;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAD3UlEQVR4AaRUbWyNZxi+nuedlsqw1tpVg6wWNizrOp1l9sEWMoslltl+dMu2RPa98kOIIEGiEm3ER4uEX8R3hMQPEkRFIrTlB0VPaRBV1fbQj9MP2r7ncd/3e87rOefQVLy5n+e5P677up/PV6Of77/15eMLiiqXLSiqPFFQXHG/oKiiTxrp4qMYY/qhwHMLcNL/ReV7tKtqAFNoYGbCIJOIHGmki49ijGEs51AsQRIK0Ez/oKTrCio/Af0CB2M5h3PjITEFCmjJNNPtBOKZ0vBS4nCucFhpfgGvuim0YgNWhw0dhNEZQyN4U+hxeaYUkP0z2Oa5gPxv3kbxwlys/usDLP19EmZPy4qG/DErPQUr5r+PzYvzsObfHMyf+44fo5VsE07ySAHlYiXp/rY87nGRnOTgjWFJGPF6EsoqH1A4VuqbuhBsfeI7Q529vk6KE+GE5koq7kBb2p8lpgx+DT/NGgtFWbZ8lfcWJmYP913tsQUIr/KZW2tXz/NREaU11IvWUA+aHj0Wz5T30vDjzLGiczfrk1GYO300qwh19eJUeQPiViAx5tY0s+liWd2Nu+1Yt/MaNu8PoPFht0Q+y0mXs/hwQirmfO6dSVtHDzburcbRs/dw7Fy94OyOubVRZrLtZL2zuw/ceNkb9wVkJWFjcLu+A1dqW2Rk8g17qtHc4m0nYznXbsytYZBuO+N1LrSBZrnjcC0Cd9rgugZbD9WgeNd1PGrviYfH2sQttyjWm2jN/jQL03LehFa0aAqPGpkCPgfPIkc/oum4m/qJ4/sZY/BFbjomjxtBpJnISB2Mv+eNF98v32ZTOl78KTRpZdTVeETuu6ngm/PD12MwY0qGhHmvz11uBu91MHL/8yal4bfvxmFIsiMFBWh1zK0NcAZxX+bIIfh1Tja+zPXImbT0YECuZPcTF6UHAqhr7JQsnswqevEf0VUWh9Uxtw474UOWT9S04ckyctfR1YdN+6rRYh0oFynZXwN+zYzhFfD/iHW7MbfesmjqDQOz1w7YBRxHwbajODds0Ec3KmrzLyWq88iczK3FcLCaRpeayIWqIA6fvovdx29j97FbaAh6j02CkS5pkMaJC/dRQo+x7OIDeRvRW0YQ13ickAJcCQr/UEDkfFUzzlxqRMXVIKpqW9HWEfMjEwy/D47drAvhSFmdvHp+jBIkLuEkQwrQiJLFH+8A1HK88qeWe1wekV+AzZIleWtpJX+S7m8X6QMVl3OFw8qIKcB+rh52zEQ+JLYH0hjLOZwbj08owADev9IlU3+mpAmgbVNQJ2l2DQBcaQoN4qMYYxjLORRLkKcAAAD//14d9HAAAAAGSURBVAMA2A2aSkD9o1UAAAAASUVORK5CYII=',
            deviceType: 'isRouter',
          },
          wrapName: '"GPN-0107_HE...',
        },
      ],
      circuits_details: [
        {
          a_end: {
            site: {
              id: 508,
              name: 'P Site04',
            },
            device: {
              id: 498,
              name: 'TDevice01',
            },
            model: {
              id: 193,
              name: 'NetEngine 8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 16888,
              name: 'GigabitEthernet0/5/0',
            },
            ip_address: {
              id: 4324,
              name: '124.0.0.39/28',
            },
          },
          circuit: null,
          z_end: null,
        },
        {
          core_link_type: 'Ring',
          ring: {
            id: 2,
            name: 'GPNRing',
          },
          circuit: {
            id: 137,
            name: 'CNAMETest005',
            circuit_ID: 'CIDTest005',
            provider: {
              id: 2,
              name: 'BBI',
            },
            commit_rate: null,
            tenant: {
              id: 224,
              name: '14th Aug Org',
            },
            lldp_cdp: false,
            ldp: false,
            bandwidth: 100,
            bandwidth_unit: 'Gbps',
            mtu: 1500,
            media: 'Optical',
            load_interval: 300,
            created: '2025-08-14T06:15:57.748Z',
          },
          a_end: {
            site: {
              id: 508,
              name: 'P Site04',
            },
            device: {
              id: 498,
              name: 'TDevice01',
            },
            model: {
              id: 193,
              name: 'NetEngine 8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 16888,
              name: 'GigabitEthernet0/5/0',
            },
            ip_address: {
              id: 4324,
              name: '124.0.0.39/28',
            },
          },
          z_end: {
            site: {
              id: 511,
              name: 'P Site05',
            },
            device: {
              id: 496,
              name: '"GPN-0107_HEL-JOS-HOS_NE8-01"',
            },
            model: {
              id: 144,
              name: 'NE8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 16551,
              name: 'GigabitEthernet0/13/1',
            },
            ip_address: {
              id: 4322,
              name: '124.0.0.37/28',
            },
          },
        },
        {
          a_end: {
            site: {
              id: 511,
              name: 'P Site05',
            },
            device: {
              id: 496,
              name: '"GPN-0107_HEL-JOS-HOS_NE8-01"',
            },
            model: {
              id: 144,
              name: 'NE8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 16561,
              name: 'GigabitEthernet0/5/3',
            },
            ip_address: {
              id: 4326,
              name: '124.0.0.41/28',
            },
          },
          circuit: null,
          z_end: null,
        },
        {
          core_link_type: 'Ring',
          ring: {
            id: 2,
            name: 'GPNRing',
          },
          circuit: {
            id: 138,
            name: 'CIDNAME006',
            circuit_ID: 'CIDTest006',
            provider: {
              id: 2,
              name: 'BBI',
            },
            commit_rate: null,
            tenant: {
              id: 224,
              name: '14th Aug Org',
            },
            lldp_cdp: false,
            ldp: false,
            bandwidth: 100,
            bandwidth_unit: 'Gbps',
            mtu: 1500,
            media: 'Optical',
            load_interval: 300,
            created: '2025-08-14T06:17:12.837Z',
          },
          a_end: {
            site: {
              id: 511,
              name: 'P Site05',
            },
            device: {
              id: 496,
              name: '"GPN-0107_HEL-JOS-HOS_NE8-01"',
            },
            model: {
              id: 144,
              name: 'NE8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 16561,
              name: 'GigabitEthernet0/5/3',
            },
            ip_address: {
              id: 4326,
              name: '124.0.0.41/28',
            },
          },
          z_end: {
            site: {
              id: 509,
              name: 'P Site01',
            },
            device: {
              id: 499,
              name: 'GPN-0105_NOK-NGW-CLI_NE8-01',
            },
            model: {
              id: 193,
              name: 'NetEngine 8000 M14',
            },
            oem: {
              id: 24,
              name: 'Huawei',
            },
            interface: {
              id: 17143,
              name: 'GigabitEthernet0/5/4',
            },
            ip_address: {
              id: 4325,
              name: '124.0.0.40/28',
            },
          },
        },
      ],
      cordinate: 5.585053606381854,
      height: 450,
      x2: 984,
      y2: 184,
      x1: 639.5,
      y1: 473,
      imageCordinate: {
        x: 979,
        y: 179,
      },
      textCordinate: {
        x: 968,
        y: 209,
      },
      wrapName: 'P Site05',
      dependentDevice: 1,
      haveCircuit: true,
      circuits: [
        {
          x1: 718,
          y1: 33,
          x2: 984,
          y2: 187,
          deviceTo: 498,
          a_end_Interface: 'GigabitEthernet0/5/0',
          a_end_Ip: '124.0.0.39/28',
          z_end_Interface: 'GigabitEthernet0/13/1',
          z_end_Ip: '124.0.0.37/28',
          deviceFrom: 496,
          circuit: {
            id: 137,
            name: 'CNAMETest005',
            circuit_ID: 'CIDTest005',
            provider: {
              id: 2,
              name: 'BBI',
            },
            commit_rate: null,
            tenant: {
              id: 224,
              name: '14th Aug Org',
            },
            lldp_cdp: false,
            ldp: false,
            bandwidth: 100,
            bandwidth_unit: 'Gbps',
            mtu: 1500,
            media: 'Optical',
            load_interval: 300,
            created: '2025-08-14T06:15:57.748Z',
          },
          core_link_type: 'Ring',
          dom: {
            x: 979,
            y: 179,
          },
        },
      ],
      showDevice: true,
      deviceView: true,
      rect: {
        x: 944,
        y: 169,
        height: 40,
        width: 80,
      },
      cross: {
        x: 1014,
        y: 164,
      },
    },
  ];

  siteEdges: any = [];
  ngOnInit(): void {
    // Define sites, devices, and links
    // this.allSites = [
    //   {
    //     id: 1,
    //     label: 'Site 1',
    //     devices: [
    //       { id: 101, label: 'Device A1' },
    //       { id: 102, label: 'Device A2' },
    //     ],
    //     links: [
    //       { from: 101, to: 201 }, // Cross-site
    //       { from: 101, to: 202 }, // Cross-site
    //       { from: 102, to: 301 }, // Cross-site
    //     ],
    //   },
    //   {
    //     id: 2,
    //     label: 'Site 2',
    //     devices: [
    //       { id: 201, label: 'Device B1' },
    //       { id: 202, label: 'Device B2' },
    //     ],
    //     links: [{ from: 202, to: 301 }], // Cross-site
    //   },
    //   {
    //     id: 3,
    //     label: 'Site 3',
    //     devices: [{ id: 301, label: 'Device C1' }],
    //     links: [],
    //   },
    // ];

    // Ori Data
    console.log('row data', this.rawData);
    this.allSites = this.rawData.map((site: any) => ({
      id: site.id,
      label: site.name,
      devices: site.devices.map((device: any) => ({
        id: device.id,
        label: device.name,
      })),
      links: (site.circuits_details || [])
        .map((detail: any) => {
          const fromDevice = detail.a_end.device?.id;
          const toDevice = detail.z_end?.device?.id;

          if (fromDevice && toDevice) {
            let selectedCircuitIds = this.siteEdges.map((edge: any) => edge.id);
            if (!selectedCircuitIds.includes(detail.circuit.id)) {
              this.siteEdges.push({
                from: detail.a_end.site?.id,
                to: detail.z_end.site?.id,
                id: detail.circuit.id,
                arrows: 'to',
                dashes: true,
              });
            }
            return {
              from: fromDevice,
              to: toDevice,
              bandwidth: detail.bandwidth,
              provider: detail.provider,
              circuitId: detail.circuit_id,
            };
          }
          return null;
        })
        .filter((link: any) => link !== null),
    }));

    // Add initial site nodes
    const siteNodes = this.allSites.map((site) => ({
      id: site.id,
      label: site.label,
      shape: 'dot',
      size: 20,
      color: '#3b82f6',
    }));
    this.nodes.add(siteNodes);

    // this.siteEdges.push({
    //   id: 100,
    //   from: 509,
    //   to: 510,
    //   label: 'JA',
    //   dashes: true,
    //   arrows: 'to',
    //   smooth: { type: 'curvedCW', roundness: 0.2 },
    // });

    const updatedSite_Edges = this.addSmoothCurves(this.siteEdges);
    this.edges.add(updatedSite_Edges);
    // Static site-to-site links
    // this.edges.add([
    //   {
    //     id: 'site-link-1-2',
    //     from: 509,
    //     to: 510,
    //     label: 'Link A',
    //     arrows: 'to',
    //     dashes: true,
    //   },
    //   // {
    //   //   id: 'site-link-1-3',
    //   //   from: 1,
    //   //   to: 3,
    //   //   label: 'Link B',
    //   //   arrows: 'to',
    //   //   smooth: { type: 'curvedCW', roundness: 0.2 },
    //   // },
    // ]);

    // Create network
    this.network = new Network(
      this.networkContainer.nativeElement,
      {
        nodes: this.nodes,
        edges: this.edges,
      },
      {
        nodes: {
          font: { size: 14 },
        },
        edges: {
          font: {
            size: 12,
            color: '#333',
            background: 'white',
          },
          smooth: true,
        },
        interaction: {
          hover: false,

          hoverConnectedEdges: false,
          selectConnectedEdges: false,
        },
        physics: { enabled: false },
      }
    );

    // Handle site double-clicks
    this.network.on('doubleClick', (params) => {
      if (params.nodes.length > 0) {
        const siteId = params.nodes[0];
        this.toggleDevicesForSite(siteId);
      }
    });

    // Handle clicks (ignore rect node clicks)
    this.network.on('click', (params) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const node: any = this.nodes.get(nodeId);

        if (node?.isRect) {
          this.network.unselectAll();
          return;
        }

        if (this.isDeviceNode(nodeId)) {
          this.showDeviceDetails(node);
        }
      }
    });

    // Handle dragging of site nodes to move attached devices and rectangle
    this.network.on('dragging', (params) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];

        if (this.isSiteNode(nodeId)) {
          this.moveAttachedDevices(nodeId);
          // this.moveRectForSite(nodeId);
        }
      }
    });

    // Handle dragging start of rect nodes
    this.network.on('dragStart', (params) => {
      for (const nodeId of params.nodes) {
        const node: any = this.nodes.get(nodeId);
        if (node?.isRect) {
          this.dragStartPos[nodeId] = this.network.getPositions([nodeId])[
            nodeId
          ];
        }
      }
    });

    this.network.on('dragEnd', (params) => {
      for (const nodeId of params.nodes) {
        const node: any = this.nodes.get(nodeId);
        if (node?.isRect) {
          const newPos = this.network.getPositions([nodeId])[nodeId];
          const oldPos = this.dragStartPos[nodeId];
          if (!oldPos) return;

          const deltaX = newPos.x - oldPos.x;
          const deltaY = newPos.y - oldPos.y;

          const siteId = parseInt(nodeId.replace('rect-site-', ''));
          const site = this.allSites.find((s) => s.id === siteId);
          if (!site) return;

          // Move all device nodes by delta
          for (const device of site.devices) {
            const deviceNode: any = this.nodes.get(device.id);
            if (!deviceNode) continue;
            this.nodes.update({
              id: device.id,
              x: deviceNode.x + deltaX,
              y: deviceNode.y + deltaY,
            });
          }

          // Move the close button node by delta
          const closeBtnNodeId = `rect-close-${siteId}`;
          const closeBtnNode: any = this.nodes.get(closeBtnNodeId);
          if (closeBtnNode) {
            this.nodes.update({
              id: closeBtnNodeId,
              x: closeBtnNode.x + deltaX,
              y: closeBtnNode.y + deltaY,
            });
          }

          // Update the old position for next drag
          this.dragStartPos[nodeId] = newPos;
        }
      }
    });

    // Prevent hover effect on rect nodes
    this.network.on('hoverNode', (params) => {
      const node: any = this.nodes.get(params.node);
      if (node?.isRect) {
        this.network.unselectAll(); // removes hover highlight
        // Optionally also clear pointer:
        this.network.releaseNode();
      }
    });

    this.network.on('click', (params) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const node: any = this.nodes.get(nodeId);

        if (node?.isRect) {
          this.network.unselectAll();
          return;
        }

        if (node?.isCloseBtn) {
          const siteId = parseInt(nodeId.replace('rect-close-', ''));
          this.toggleDevicesForSite(siteId);
          return; // Important: return here to stop further processing
        }

        if (this.isDeviceNode(nodeId)) {
          this.showDeviceDetails(node);
        }
      }
    });
  }

  private getSiteEdges(siteId: number): string[] {
    return this.edges
      .get()
      .filter((e: any) => e.from === siteId || e.to === siteId)
      .map((e: any) => e.id);
  }

  private toggleDevicesForSite(siteId: number): void {
    const site = this.allSites.find((s) => s.id === siteId);
    if (!site) return;

    const isExpanded = this.expandedSites.has(siteId);
    const deviceIds = site.devices.map((d: any) => d.id);
    const siteEdgeIds = this.getSiteEdges(siteId);
    const rectNodeId = `rect-site-${siteId}`;

    if (isExpanded) {
      console.log('Collapsing site:', siteId);

      // Remove devices
      this.nodes.remove(deviceIds);

      // Remove rect and close button nodes
      this.nodes.remove(rectNodeId);
      const closeBtnNodeId = `rect-close-${siteId}`;
      this.nodes.remove(closeBtnNodeId);

      // Remove edges related to devices
      const edgesToRemove = this.edges
        .get()
        .filter(
          (e: any) => deviceIds.includes(e.from) || deviceIds.includes(e.to)
        )
        .map((e: any) => e.id);
      this.edges.remove(edgesToRemove);

      // Restore site node appearance
      this.nodes.update({
        id: site.id,
        label: site.label,
        shape: 'dot',
        size: 20,
        color: {
          background: '#3b82f6',
          border: '#2c7be5',
        },
        fixed: false,
        physics: false,
      });

      // Remove existing site edges to avoid duplication
      const siteEdgeIds = this.siteEdges.map((edge: any) => edge.id);
      this.edges.remove(siteEdgeIds);

      // Re-add site edges with smoothing
      const updatedSiteEdges = this.addSmoothCurves(this.siteEdges);
      this.edges.add(updatedSiteEdges);

      this.expandedSites.delete(siteId);

      this.network.redraw();
    } else {
      // EXPAND: hide site node
      this.nodes.update({
        id: site.id,
        label: '',
        size: 0,
        color: {
          background: 'rgba(0,0,0,0)',
          border: 'rgba(0,0,0,0)',
        },
        fixed: true,
        physics: false,
      });

      // Remove site-to-site edges
      console.log('site id', siteEdgeIds);

      // console.log('site edge b4', this.edges);

      this.edges.remove(siteEdgeIds);

      // console.log('site edge after', this.edges);

      // Position and show devices
      const sitePosition = this.network.getPositions([siteId])[siteId];
      const spacingX = 100;
      const spacingY = 100;

      const deviceNodes = site.devices.map((device: any, index: number) => {
        const offsetX = (index - (site.devices.length - 1) / 2) * spacingX;

        return {
          id: device.id,
          label: `📱 ${device.label}`,
          shape: 'box',
          color: {
            background: '#fef3c7',
            border: '#f59e0b',
          },
          font: {
            align: 'left',
          },
          x: sitePosition.x + offsetX,
          y: sitePosition.y + spacingY,
          fixed: { x: false, y: false },
        };
      });

      this.nodes.add(deviceNodes);
      this.expandedSites.add(siteId);

      // Add dotted rectangle node around devices
      const padding = 50;
      const deviceXs = deviceNodes.map((d: { x: any }) => d.x);
      const deviceYs = deviceNodes.map((d: { y: any }) => d.y);

      const minX = Math.min(...deviceXs) - padding;
      const maxX = Math.max(...deviceXs) + padding;
      const minY = Math.min(...deviceYs) - padding;
      const maxY = Math.max(...deviceYs) + padding;

      const rectNode = {
        id: rectNodeId,
        x: (minX + maxX) / 2,
        y: (minY + maxY) / 2,
        shape: 'box',
        widthConstraint: maxX - minX,
        heightConstraint: maxY - minY,
        color: {
          background: 'rgba(0,0,0,0)',
          border: '#999',
        },
        borderWidth: 1,
        borderDashes: [5, 5],
        physics: false,
        fixed: false, // allow dragging
        label: '',
        font: { color: 'rgba(0,0,0,0)' }, // hide label on hover
        isRect: true, // custom flag to identify rect node
      };

      this.nodes.add(rectNode);

      // Add close button node positioned relative to rectNode
      const closeBtnNodeId = `rect-close-${siteId}`;
      const closeButtonNode = {
        id: closeBtnNodeId,
        label: '✖', // Cross mark
        shape: 'text',
        font: { size: 20, color: '#f87171', face: 'Arial' },
        x: rectNode.x - rectNode.widthConstraint / 2 + 20, // top-left corner offset
        y: rectNode.y - rectNode.heightConstraint / 2 + 20,
        fixed: true,
        physics: false,
        isCloseBtn: true,
        // Make sure user cannot drag this node separately
        // No edges, no interaction needed except click
      };

      this.nodes.add(closeButtonNode);
    }

    this.rebuildAllDeviceEdges();
  }

  private rebuildAllDeviceEdges(): void {
    // Remove existing device-related edges
    const allDeviceIds = this.allSites.flatMap((site) =>
      site.devices.map((d: any) => d.id)
    );
    const edgesToRemove = this.edges
      .get()
      .filter(
        (e: any) => allDeviceIds.includes(e.from) || allDeviceIds.includes(e.to)
      )
      .map((e: any) => e.id);
    this.edges.remove(edgesToRemove);

    const visibleNodeIds = new Set(this.nodes.getIds());
    let edgeIdCounter = 0;

    for (const site of this.allSites) {
      for (const link of site.links || []) {
        const fromVisible = visibleNodeIds.has(link.from);
        const toVisible = visibleNodeIds.has(link.to);

        // Skip if neither end is visible
        if (!fromVisible && !toVisible) continue;

        let from = link.from;
        let to = link.to;
        let dashes = false;

        // Replace invisible device with its site node
        if (!fromVisible) {
          const fromSite = this.getSiteByDeviceId(from);
          if (!fromSite) continue;
          from = fromSite.id;
          dashes = true;
        }

        if (!toVisible) {
          const toSite = this.getSiteByDeviceId(to);
          if (!toSite) continue;
          to = toSite.id;
          dashes = true;
        }

        const isCrossSite = this.isCrossSite(link.from, link.to);

        this.edges.add({
          id: `device-link-${edgeIdCounter++}`,
          from,
          to,
          arrows: 'to',
          smooth: { type: 'discrete' },
          dashes,
          color: {
            color: isCrossSite ? '#6366f1' : '#999',
          },
        });
      }
    }
  }

  private isCrossSite(fromDeviceId: number, toDeviceId: number): boolean {
    const fromSite = this.getSiteByDeviceId(fromDeviceId);
    const toSite = this.getSiteByDeviceId(toDeviceId);
    return fromSite?.id !== toSite?.id;
  }

  private getSiteByDeviceId(deviceId: number): any | undefined {
    return this.allSites.find((site) =>
      site.devices.some((d: any) => d.id === deviceId)
    );
  }

  private isDeviceNode(nodeId: number): boolean {
    return this.allSites.some((site) =>
      site.devices.some((device: any) => device.id === nodeId)
    );
  }

  private showDeviceDetails(deviceNode: any): void {
    console.log('📱 Device Details:', deviceNode);
    // Add modal or sidebar here if desired
  }

  private isSiteNode(nodeId: number): boolean {
    return this.allSites.some((site) => site.id === nodeId);
  }

  private moveAttachedDevices(siteId: number): void {
    const site = this.allSites.find((s) => s.id === siteId);
    if (!site || !this.expandedSites.has(siteId)) return;

    const sitePos = this.network.getPositions([siteId])[siteId];

    // Get visible devices of this site
    const visibleDeviceNodes = site.devices.filter((d: any) =>
      this.nodes.get(d.id)
    );

    const spacingX = 100;
    const spacingY = 100;

    visibleDeviceNodes.forEach((device: any, index: number) => {
      const offsetX = (index - (visibleDeviceNodes.length - 1) / 2) * spacingX;

      this.nodes.update({
        id: device.id,
        x: sitePos.x + offsetX,
        y: sitePos.y + spacingY,
        fixed: { x: false, y: false },
      });
    });
  }

  // private moveRectForSite(siteId: number): void {
  //   const site = this.allSites.find((s) => s.id === siteId);
  //   if (!site || !this.expandedSites.has(siteId)) return;

  //   const rectNodeId = `rect-site-${siteId}`;
  //   const rectNode = this.nodes.get(rectNodeId);
  //   if (!rectNode) return;

  //   const sitePos = this.network.getPositions([siteId])[siteId];
  //   const spacingX = 100;
  //   const spacingY = 100;
  //   const padding = 50;

  //   const visibleDeviceNodes = site.devices.filter((d: any) =>
  //     this.nodes.get(d.id)
  //   );

  //   const deviceXs = visibleDeviceNodes.map(
  //     (_: any, i: number) =>
  //       sitePos.x + (i - (visibleDeviceNodes.length - 1) / 2) * spacingX
  //   );
  //   const deviceYs = visibleDeviceNodes.map(() => sitePos.y + spacingY);

  //   const minX = Math.min(...deviceXs) - padding;
  //   const maxX = Math.max(...deviceXs) + padding;
  //   const minY = Math.min(...deviceYs) - padding;
  //   const maxY = Math.max(...deviceYs) + padding;

  //   this.nodes.update({
  //     id: rectNodeId,
  //     x: (minX + maxX) / 2,
  //     y: (minY + maxY) / 2,
  //     widthConstraint: maxX - minX,
  //     heightConstraint: maxY - minY,
  //   });

  //   // Update close button node position relative to rect
  //   const closeButtonNodeId = `rect-close-${siteId}`;
  //   const closeButtonNode = this.nodes.get(closeButtonNodeId);
  //   console.log('close node', closeButtonNode);
  //   // Update close button position to stay at top-left of the rectangle
  //   if (closeButtonNode) {
  //     this.nodes.update({
  //       id: closeButtonNodeId,
  //       x: (minX + maxX) / 2 - (maxX - minX) / 2 + 20, // rect center - half width + offset
  //       y: (minY + maxY) / 2 - (maxY - minY) / 2 + 20, // rect center - half height + offset
  //     });
  //   }
  // }

  addSmoothCurves(edges: any) {
    // To keep track of how many times we've seen the same from-to pair
    const edgeCount: any = {};

    // Iterate over each edge and update it if duplicates are found
    edges.forEach((edge: any) => {
      // Create a key for the edge based on from-to nodes
      const key = `${edge.from}-${edge.to}`;

      // Increment count or initialize
      edgeCount[key] = (edgeCount[key] || 0) + 1;

      // If this is a duplicate (count > 1), add smooth with alternating direction
      if (edgeCount[key] > 1) {
        // Alternate between curvedCW and curvedCCW based on count (odd/even)
        const curveType = edgeCount[key] % 2 === 0 ? 'curvedCCW' : 'curvedCW';

        edge.smooth = {
          type: curveType,
          roundness: 0.2,
        };
      } else {
        // For the first occurrence, you can optionally add smooth to avoid overlap, or skip
        // edge.smooth = { type: 'straight' }; // or leave as is
      }
    });

    return edges;
  }
}
